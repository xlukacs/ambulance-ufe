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
  @State() newRoom: Room = {id: '@new', width: '', height: '', tipicalCostToOperate: 0, equipment: "", name: ""};
  @State() editorMode: boolean = false;
  @State() editedRoom: Room;

  private async getRooms(): Promise<Room[]> {
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
      { id: "1", width: "10", height: "10", tipicalCostToOperate: 100, equipment: "1xbed", name: "Room 1"},
      { id: "2", width: "15", height: "12", tipicalCostToOperate: 105 , equipment: "1xbed", name: "Room 2" },
    ];
  }

  private async createRoom(room: Room): Promise<Room> {
    try {
      const response = await AmbulanceRoomsApiFactory(undefined, this.apiBase).createRoom(this.ambulanceId, room);
      if (response.status < 299) {
        this.rooms = [...this.rooms, response.data];
        alert("Room created!");
        this.activateTab('tab1');
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

    let cost = 0; //TODO: this.newRoom.tipicalCostToOperate instanceof String ? parseInt(this.newRoom.tipicalCostToOperate) : this.newRoom.tipicalCostToOperate;

    const created_room = {
      id: this.newRoom.id,
      width: this.newRoom.width,
      height: this.newRoom.height,
      tipicalCostToOperate: cost,
      equipment: this.newRoom.equipment,
      name: this.newRoom.name
    }
    console.log("Creating room", created_room);


    this.createRoom(created_room);
  }

  private async editRoom(roomId: string){
    const filteredRooms = this.rooms.filter(room => room.id === roomId);
    this.editedRoom = filteredRooms.length > 0 ? filteredRooms[0] : null;

    this.editorMode = true
  }

  private async deleteRoom(roomId: string){
    try {
      const response = await AmbulanceRoomsApiFactory(undefined, this.apiBase).deleteRoom(roomId, this.ambulanceId);
      if (response.status < 299) {
        this.rooms = this.rooms.filter(room => room.id !== roomId);
      } else {
        console.error(`Cannot delete room: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error(`Cannot delete room: ${err.message || "unknown"}`);
    }
  }


  async componentWillLoad() {
    // this.getConditions();
    this.rooms = await this.getRooms();
    console.log(this.rooms)
  }

  handleInputChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    this.newRoom = {
      ...this.newRoom,
      [field]: target.value
    };
  }

  async closeEditor(event: string){
    this.editorMode = false
    console.log(event)
    if(event == "saved"){
      alert("Modifications saved!")
      this.rooms = await this.getRooms()
    }
  }

  activateTab(tabName: string){
    // Get a reference to the element you want to trigger the click event on
    const element = document.getElementById(tabName + '-tab');

    // Create a new click event
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    // Dispatch the click event on the element
    element.dispatchEvent(clickEvent);
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
        {
          this.editorMode ? (
            <ambulance-room data={this.editedRoom} apiBase={this.apiBase} ambulanceId={this.ambulanceId} onEditor-closed={(ev: CustomEvent<string>)=> this.closeEditor(ev.detail)}></ambulance-room>
          ): (
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
                {/* onClick={() => this.activateTab('tab1')} */}
                <input class="mdc-tab-radio" type="radio" name="tab" id="tab1-radio" checked />
                {/* onClick={() => this.activateTab('tab2')} */}
                <input class="mdc-tab-radio" type="radio" name="tab" id="tab2-radio" />
              </div>
              <md-list id="Rooms" class="tab_window active_tab">
                {this.rooms.length > 0 && this.rooms.map((room) =>
                <md-list-item class="room-item-list">
                  <div class="item-details">
                    <div>ID: <span>{room.id}</span></div>
                    <div>Width: <span>{room.width}</span></div>
                    <div>Height: <span>{room.height}</span></div>
                    <div>Equipment: <span>{room.equipment}</span></div>
                    <div>Name: <span>{room.name}</span></div>
                  </div>
                  <md-icon slot="start">DUNNO</md-icon>

                  <md-filled-tonal-button slot="end" onClick={() => this.editRoom(room.id) }><md-icon slot="icon">edit</md-icon></md-filled-tonal-button>
                  <md-filled-tonal-button slot="end" onClick={() => this.deleteRoom(room.id) }><md-icon slot="icon">delete</md-icon></md-filled-tonal-button>
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
                    label="New room equipment..."
                    name="new_room_equipment"
                    required
                    value={this.newRoom.equipment}
                    onInput={(event) => this.handleInputChange(event, 'equipment')}
                  />
                  <md-filled-text-field
                    label="New room name..."
                    name="new_room_name"
                    required
                    value={this.newRoom.name}
                    onInput={(event) => this.handleInputChange(event, 'name')}
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
            )
          }
      </Host>
    );
  }

}
