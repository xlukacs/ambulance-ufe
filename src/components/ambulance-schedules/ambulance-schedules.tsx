import { Component, Host, Prop, h, State, Event, EventEmitter } from '@stencil/core';
import { Schedule, Room, WaitingListEntry, AmbulanceRoomsApiFactory, AmbulanceWaitingListApiFactory, SchedulesApiFactory } from '../../api/ambulance-wl'

@Component({
  tag: 'ambulance-schedules',
  styleUrl: 'ambulance-schedules.css',
  shadow: true,
})
export class AmbulanceSchedules {
  @Prop() data: Schedule;
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;
  @State() scheduleData: Schedule;
  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;

  @State() patients: WaitingListEntry[];
  @State() rooms: Room[];
  @State() schedules: Schedule[];

  handleInputChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    this.scheduleData = {
      ...this.scheduleData,
      [field]: target.value
    };
  }

  async save(){
    try {
      const response = await SchedulesApiFactory(undefined, this.apiBase).updateSchedule(this.ambulanceId, this.scheduleData.id, this.scheduleData);
      if (response.status < 299) {
        this.scheduleData = response.data;
        this.editorClosed.emit("saved")
      } else {
        console.error(`Cannot update schedule: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error(`Cannot update schedule: ${err.message || "unknown"}`);
    }
  }

  cancel(){
    this.editorClosed.emit("cancel")
  }

  async componentWillLoad(){
    const response = await SchedulesApiFactory(undefined, this.apiBase).getSchedules(this.ambulanceId);
    this.schedules = response.data;
    const response1 = await AmbulanceWaitingListApiFactory(undefined, this.apiBase).getWaitingListEntries(this.ambulanceId);
    this.patients = response1.data;
    const response2 = await AmbulanceRoomsApiFactory(undefined, this.apiBase).getRooms(this.ambulanceId);
    this.rooms = response2.data;
  }

  componentDidLoad(){
    this.scheduleData = this.data
  }

  render() {
    if(this.scheduleData == undefined){
      console.log("nothing here")
      return ("nothing here")
    }
    console.log("Printing schedule data");
    return (
      <Host>

        <slot>
        <p><b>Update schedule data</b></p>
          <div class="form">
            <md-filled-text-field
              label="Reservation id..."
              name="new_reservation_id"
              required
              value={this.scheduleData.id}
              onInput={(event) => this.handleInputChange(event, 'id')}
            />
            {/* <md-filled-text-field
              label="New schedule patient id..."
              name="new_patientid"
              required
              value={this.newSchedule.patientId}
              onInput={(event) => this.handleInputChange(event, 'patientId')}
            /> */}
            <div class="specialSelector">
              <label htmlFor="patientSelect">Select Patient: </label>
              <select
                id="patientSelect"
                name="new_patientid"
                required
                // value={this.newSchedule.patientId}
                onInput={(event) => this.handleInputChange(event, 'patientId')}
              >
                <option value="" disabled>
                  Select a patient...
                </option>
                {this.patients.map(patient => (
                  <option value={patient.id} key={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <md-filled-text-field
              label="New schedule room id..."
              name="new_roomid"
              required
              value={this.newSchedule.roomId}
              onInput={(event) => this.handleInputChange(event, 'roomId')}
            /> */}
            <div class="specialSelector">
              <label htmlFor="roomSelect">Select Room: </label>
              <select
                id="roomSelect"
                name="new_roomid"
                required
                // value={this.newSchedule.patientId}
                onInput={(event) => this.handleInputChange(event, 'roomId')}
              >
                <option value="" disabled>
                  Select a room...
                </option>
                {this.rooms.map(room => (
                  <option value={room.id} key={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
            <md-filled-text-field
              label="Schedule note..."
              name="new_note"
              required
              value={this.scheduleData.note}
              onInput={(event) => this.handleInputChange(event, 'note')}
            />
            {/* <md-filled-text-field
              label="New schedule start time..."
              name="new_start"
              required
              value={this.newSchedule.start}
              onInput={(event) => this.handleInputChange(event, 'start')}
            /> */}
            <div class="specialInput">
              <label htmlFor="new_start">Schedule start time...</label>
              <input
                id="new_start"
                name="new_start"
                type="datetime-local"
                required
                value={this.scheduleData.start}
                onInput={(event) => this.handleInputChange(event, 'start')}
              />
            </div>
            {/* <md-filled-text-field
              label="New schedule end time..."
              name="new_end"
              required
              value={this.newSchedule.end}
              onInput={(event) => this.handleInputChange(event, 'end')}
            /> */}
            <div class="specialInput">
              <label htmlFor="new_end">Schedule end time...</label>
              <input
                id="new_end"
                name="new_end"
                type="datetime-local"
                required
                value={this.scheduleData.end}
                onInput={(event) => this.handleInputChange(event, 'end')}
              />
            </div>
          </div>
        </slot>

        <md-filled-tonal-button onClick={() => this.save()}>Save</md-filled-tonal-button>
        <md-filled-tonal-button onClick={() => this.cancel()}>Cancel</md-filled-tonal-button>
      </Host>
    );
  }

}
