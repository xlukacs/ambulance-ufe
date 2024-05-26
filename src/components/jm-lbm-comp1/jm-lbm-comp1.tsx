import { Component, Host, Prop, State, h } from '@stencil/core';
declare global {
  interface Window { navigation: any; }
}
@Component({
  tag: 'jm-lbm-comp1',
  styleUrl: 'jm-lbm-comp1.css',
  shadow: true,
})
export class JmLbmComp1 {
  @State() private relativePath = "";
  @Prop() basePath: string="";
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;
    console.log("Base path", baseUri)

    const toRelative = (path: string) => {
      if (path.startsWith( baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }

      console.log("Relative path", this.relativePath)
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      console.log("Navigate to", path)
      toRelative(path);
    });

    toRelative(location.pathname)
  }
  render() {
    let element = "home"
    console.log(this.relativePath)
    console.log(this.relativePath.indexOf("entry"))

    if ( this.relativePath.startsWith("room-manager/") ){
      element = "rooms";
    }

    if ( this.relativePath.startsWith("reservation-manager/") ){
      element = "reservation";
    }

    if ( this.relativePath.startsWith("patient-manager/") || this.relativePath.indexOf("entry") >= 0){
      element = "patients";
    }

    const navigate = (path:string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      console.log("Navigate to", absolute)
      window.navigation.navigate(absolute)
    }

    return (
      <Host>
        <slot>
          <button class="home" onClick={() => navigate('./') }>
            <md-icon>home</md-icon>
          </button>

          {
            element === 'rooms' ? (
              <room-manager ambulance-id={this.ambulanceId} api-base={this.apiBase}></room-manager>
            ) : element === 'reservation' ? (
              <schedule-manager ambulance-id={this.ambulanceId} api-base={this.apiBase}></schedule-manager>
            ) : element === 'patients' ? (
              <lbmjm-ambulance-wl-app  ambulance-id={this.ambulanceId} api-base={this.apiBase} base-path={this.basePath}></lbmjm-ambulance-wl-app>
            ) : (
              <div class="content">
                <div class="bubble">
                  <h2>
                    Hospital management system
                  </h2>
                  <div class="navigation">
                    <button class="material-button" onClick={() => navigate('./patient-manager/') }>Load patient manager</button>
                    <button class="material-button" onClick={() => navigate('./room-manager/') }>Load room manager</button>
                    <button class="material-button" onClick={() => navigate('./reservation-manager/')}>Load reservation manager</button>
                  </div>
                </div>
              </div>
            )
          }
        </slot>
      </Host>
    );
  }

}
