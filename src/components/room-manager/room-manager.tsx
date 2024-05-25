import { Component, Host, h, Element, State, Prop} from '@stencil/core';
import { AmbulanceRoomsApiFactory, Room } from '../../api/ambulance-wl';
@Component({
  tag: 'room-manager',
  styleUrl: 'room-manager.css',
  shadow: true,
})
export class RoomManager {
  @Element() element: HTMLElement;
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;
  @State() rooms: Room[];
  @State() newRoom: Room = {id: '', width: '', height: '', tipicalCostToOperate: 0};

  private async getConditions(): Promise<Room[]> {
    let local_rooms: Room[];

    try {
       const response = await AmbulanceRoomsApiFactory(undefined, this.apiBase).getRooms(this.ambulanceId);
       if (response.status < 299) {
       local_rooms = response.data;
       }
    } catch (err: any) {
       // no strong dependency on conditions
        console.error(`Cannot retrieve list of rooms: ${err.message || "unknown"}`);
    }
    // always have some fallback condition
    return local_rooms || [
      { id: "1", width: "10", height: "10", tipicalCostToOperate: 100 },
      { id: "2", width: "15", height: "12", tipicalCostToOperate: 105 }
    ];
  }

  private async createRoom(room: Room): Promise<Room> {
    try {
      const response = await AmbulanceRoomsApiFactory(undefined, this.apiBase).createRoom(this.ambulanceId, room);
      if (response.status < 299) {
        this.rooms = [...this.rooms, response.data];
        return response.data;
      } else {
        console.error(`Cannot create room: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error(`Cannot create room: ${err.message || "unknown"}`);
    }
    return undefined;
  }

  private async generateRoom(){
    // let id_element = this.element.shadowRoot.querySelector('input[name="new_room_id"]') as HTMLInputElement;
    // let width_element = this.element.shadowRoot.querySelector('input[name="new_room_width"]') as HTMLInputElement;
    // let height_element = this.element.shadowRoot.querySelector('input[name="new_room_height"]') as HTMLInputElement;
    // let tipicalCostToOperate_element = this.element.shadowRoot.querySelector('input[name="new_room_costph"]') as HTMLInputElement;

    // const newRoom = {
    //   id: id_element.value,
    //   width: width_element.value,
    //   height: height_element.value,
    //   tipicalCostToOperate: parseInt(tipicalCostToOperate_element.value)
    // }


    // const tcoph = parseInt(this.newRoom.tipicalCostToOperate);

    const created_room = {
      id: this.newRoom.id,
      width: this.newRoom.width,
      height: this.newRoom.height,
      tipicalCostToOperate: this.newRoom.tipicalCostToOperate
    }
    console.log("Creating room", created_room);


    this.createRoom(created_room);
  }

  private async editRoom(){
    console.log("Edit room");
  }

  private async deleteRoom(){
    console.log("Delete room");
  }


  async componentWillLoad() {
    // this.getConditions();
    this.rooms = await this.getConditions();
  }

  handleInputChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    this.newRoom = {
      ...this.newRoom,
      [field]: target.value
    };
  }

  componentDidLoad() {
    const tabs = this.element.shadowRoot.querySelectorAll('.mdc-tab');
    const tab_windows = this.element.shadowRoot.querySelectorAll('.tab_window');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('mdc-tab--active'));
        tab.classList.add('mdc-tab--active');

        tab_windows.forEach(tw => {tw.classList.remove('active_tab')});
        this.element.shadowRoot.getElementById(tab.innerHTML).classList.add('active_tab');
      });
    });
  }


  render() {
    return (
      <Host>
        <slot>
          <h1>
            Room manager
          </h1>
          <p>
            Room manager is a tool to manage rooms.
          </p>

          <div class="tabSelector">
            <div class="mdc-tab-bar" role="tablist">
              <label class="mdc-tab mdc-tab--active" role="tab" id="tab1-tab" tabindex="0" htmlFor="tab1-radio">Rooms</label>
              <label class="mdc-tab" role="tab" id="tab2-tab" tabindex="0" htmlFor="tab2-radio">Manage</label>
            </div>
            <input class="mdc-tab-radio" type="radio" name="tab" id="tab1-radio" checked />
            <input class="mdc-tab-radio" type="radio" name="tab" id="tab2-radio" />
          </div>
          <md-list id="Rooms" class="tab_window active_tab">
            {this.rooms.length > 0 && this.rooms.map((room) =>
            <md-list-item class="room-item-list">
              <div class="item-details">
                <div>ID: <span>{room.id}</span></div>
                <div>Width: <span>{room.width}</span></div>
                <div>Height: <span>{room.height}</span></div>
                <div>Cost/H: <span>{room.tipicalCostToOperate}</span></div>
              </div>
              <md-icon slot="start">DUNNO</md-icon>

              <md-button slot="end" onClick={() => this.editRoom() }><md-icon slot="icon">edit</md-icon></md-button>
              <md-button slot="end" onClick={() => this.deleteRoom() }><md-icon slot="icon">delete</md-icon></md-button>
            </md-list-item>
          )}
          </md-list>
          <div id="Manage" class="tab_window">
            <p><b>Create new rooms</b></p>
            <div class="form">
              <md-filled-text-field
                label="New room id..."
                name="new_room_id"
                required
                value={this.newRoom.id}
                onInput={(event) => this.handleInputChange(event, 'id')}
              />
              <md-filled-text-field
                label="New room width..."
                name="new_room_width"
                required
                value={this.newRoom.width}
                onInput={(event) => this.handleInputChange(event, 'width')}
              />
              <md-filled-text-field
                label="New room height..."
                name="new_room_height"
                required
                value={this.newRoom.height}
                onInput={(event) => this.handleInputChange(event, 'height')}
              />
              <md-filled-text-field
                label="New room cost per hour..."
                name="new_room_costph"
                required
                value={this.newRoom.tipicalCostToOperate}
                onInput={(event) => this.handleInputChange(event, 'tipicalCostToOperate')}
              />
            </div>

            {/* <button onClick={() => this.generateRoom()}>Save</button> */}
            <md-filled-button
              onClick={() => this.generateRoom() }
              >
              <md-icon slot="icon">Save</md-icon>
              Save
          </md-filled-button>
          </div>
        </slot>
      </Host>
    );
  }

}
