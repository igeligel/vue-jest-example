import Vue from 'vue';
import jsdom from 'jsdom';
import HelloComponent from '../src/components/Hello.vue';

const renderer = require('vue-server-renderer').createRenderer();

describe('Test suite for HelloComponent', () => {
  it('Test data msg', () => {
    const ClonedComponent = Vue.extend(HelloComponent);
    const NewComponent = new ClonedComponent({
      data() {
        return {
          msg: 'I am a cool message',
        };
      },
    }).$mount();
    renderer.renderToString(NewComponent, (err, str) => {
      const dom = new jsdom.JSDOM(str);
      const firstHeading = dom.window.document.querySelector('h1');
      expect(firstHeading.textContent).toContain('I am a cool message');
    });
  });

  it('Test toggling method', () => {
    const ClonedComponent = Vue.extend(HelloComponent);
    const NewComponent = new ClonedComponent().$mount();
    renderer.renderToString(NewComponent, (err, str) => {
      let dom = new jsdom.JSDOM(str);
      let firstHeading = dom.window.document.querySelector('h1');
      expect(firstHeading.classList.length).toBe(1);
      expect(firstHeading.classList).toContain('blue');
      NewComponent.toggleClass();
      renderer.renderToString(NewComponent, (errToggleClass, strToggleClass) => {
        // Now the classes should have changed.
        dom = new jsdom.JSDOM(strToggleClass);
        firstHeading = dom.window.document.querySelector('h1');
        expect(firstHeading.classList.length).toBe(2);
        expect(firstHeading.classList).toContain('red');
        expect(firstHeading.classList).toContain('shadow');
      });
    });
  });
});
