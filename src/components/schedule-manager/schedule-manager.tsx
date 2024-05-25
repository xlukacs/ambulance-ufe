import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'schedule-manager',
  styleUrl: 'schedule-manager.css',
  shadow: true,
})
export class ScheduleManager {

  render() {
    return (
      <Host>
        <slot>
          <h1>
            Schedule manager
          </h1>
          <p>
            Schdule manager is a tool to manage rooms.
          </p>
          <ul>
            <li>Room1</li>
            <li>Room2</li>
            <li>Room3</li>
          </ul>
        </slot>
      </Host>
    );
  }

}
