import { newSpecPage } from '@stencil/core/testing';
import { JmLbmComp1 } from '../jm-lbm-comp1';

describe('jm-lbm-comp1', () => {
  xit('renders', async () => {
    const page = await newSpecPage({
      components: [JmLbmComp1],
      html: `<jm-lbm-comp1></jm-lbm-comp1>`,
    });
    expect(page.root).toEqualHtml(`
      <jm-lbm-comp1>
        <mock:shadow-root>
          <slot>
            <p>Hellow world from Marcel Javorka and Bence Mark Lukacs</p>
            <md-icon>add</md-icon>
            <md-icon>up</md-icon>
            <md-icon>add</md-icon>
          </slot>
        </mock:shadow-root>
      </jm-lbm-comp1>
    `);
  });
});
