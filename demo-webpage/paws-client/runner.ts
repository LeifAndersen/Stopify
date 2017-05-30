// This code runs on the right-hand side IFRAME that displays the output
// from the running program. The code receives two kinds of messages
// from the container (1) a message containing the JavaScript to run,
// before it has been stopified and (2) a message directing execution to stop.
'use strict';

import { yieldStopify } from '../../src/stopifyYield';
import { yieldSteppify } from '../../src/steppifyYield';
import { cpsStopify } from '../../src/stopifyCPSEval';
import { shamStopify } from '../../src/stopifySham';
import { regeneratorStopify } from '../../src/stopifyRegenerator';
import { Stoppable, stopify, isStopify } from '../../src/stopifyInterface';
import { Steppable, steppify, isSteppify } from '../../src/steppifyInterface';
let stopped = false;

let running: Stoppable;

const transforms : { [transform: string]: stopify | steppify }= {
  'sham': shamStopify,
  'yield': yieldStopify,
  'regenerator': regeneratorStopify,
  'cps': cpsStopify,
  'yield-debug': yieldSteppify,
}

function transform(f: stopify | steppify, code: string): Stoppable {
  let stopped = false;
  if (isStopify(f)) {
    return f(code, () => stopped, () => stopped = true);
  } else {
    // TODO(rachit): Implement breakpoints
    return f(code, [], () => stopped, () => stopped = true);
  }
}

window.addEventListener('message', evt => {
  if (evt.data.code) {
    running = transform(transforms[evt.data.transform], evt.data.code);
    running.run(() => console.log("Done"));
  }
  else if (evt.data === 'stop') {
    running.stop(() => console.log("Terminated"));
  }
});

document.body.style.fontFamily = 'Monaco';

const originalConsole = window.console;

window.console.log = function(message: string) {
  const elt = document.createElement('div');
  elt.appendChild(document.createTextNode(message.toString()));
  document.body.appendChild(elt);
  if (document.body.children.length > 1000) {
    document.body.removeChild(<Node>document.body.firstChild);
  }
}
