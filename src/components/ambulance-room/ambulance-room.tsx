import { Component, Host, Prop, h, State, Event, EventEmitter } from '@stencil/core';
import { Room, AmbulanceRoomsApiFactory } from '../../api/ambulance-wl'

@Component({
  tag: 'ambulance-room',
  styleUrl: 'ambulance-room.css',
  shadow: true,
})
export class AmbulanceRoom {
  @Prop() data: Room;
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;
  @State() roomData: Room;
  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;

  handleInputChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    this.roomData = {
      ...this.roomData,
      [field]: target.value
    };
  }

  async save(){
    try {
      const response = await AmbulanceRoomsApiFactory(undefined, this.apiBase).updateRoom(this.ambulanceId, this.roomData.id, this.roomData);
      if (response.status < 299) {
        this.roomData = response.data;
        this.editorClosed.emit("saved")
      } else {
        console.error(`Cannot update room: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error(`Cannot update room: ${err.message || "unknown"}`);
    }
  }

  cancel(){
    this.editorClosed.emit("cancel")
  }

  componentDidLoad(){
    this.roomData = this.data
  }

  render() {
    if(this.roomData == undefined){
      return ("nothing here")
    }
    return (
      <Host>

        <slot>
        <p><b>Update room data</b></p>
            <div class="form">
              <md-filled-text-field
                label="Update room id..."
                name="new_room_id"
                required
                disabled
                value={this.roomData.id}
              />
              <md-filled-text-field
                label="Update room width..."
                name="new_room_width"
                required
                value={this.roomData.width}
                onInput={(event) => this.handleInputChange(event, 'width')}
              />
              <md-filled-text-field
                label="Update room height..."
                name="new_room_height"
                required
                value={this.roomData.height}
                onInput={(event) => this.handleInputChange(event, 'height')}
              />
              <md-filled-text-field
                label="Update room equipment..."
                name="new_room_equipment"
                required
                value={this.roomData.equipment}
                onInput={(event) => this.handleInputChange(event, 'equipment')}
              />
              <md-filled-text-field
                label="Update room name..."
                name="new_room_name"
                required
                value={this.roomData.name}
                onInput={(event) => this.handleInputChange(event, 'name')}
              />
            </div>
        </slot>

        <md-filled-tonal-button onClick={() => this.save()}>Save</md-filled-tonal-button>
        <md-filled-tonal-button onClick={() => this.cancel()}>Cancel</md-filled-tonal-button>
      </Host>
    );
  }

}
