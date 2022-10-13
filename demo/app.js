" use strict"

import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import ScrollBox from '../src';

const data = {
  short: ' Lorem ipsum dolor sit amet, cu vel rebum graece.',
  long: `Lorem ipsum dolor sit amet, cu vel rebum graece.
  Id per utamur facilisi, duo aperiri iracundia ea.
  Qui hinc adhuc latine ad, per an adhuc rebum. Ex qui consul dictas, nec quidam neglegentur ei, et probo contentiones ius.
  Vim te graeco voluptaria inciderint, te ignota dolorum quo. Duo cu atqui causae iuvaret, ad laudem imperdiet sit,
  ei reque volutpat philosophia eos. Unum delenit indoctum quo ei. An hinc tritani eam, sed animal dignissim torquatos ne.
  Cu vel laoreet constituam, consetetur neglegentur pro te, qui no mucius graecis constituam. Pri mundi labore persequeris et,
  at vix simul altera omnesque, populo reprimique reformidans sit et. Nominavi dissentiunt et nec, quod congue an eum. Legere invenire duo at,
  mea at legere scripta maiestatis, homero impedit pro ei. Per nulla iisque eu. Ea mel assum inermis, nec oratio nemore phaedrum at.
  No viris vocibus eum, animal dolorem eu sea. Deserunt conceptam delicatissimi vix eu, adhuc epicuri no cum. Adhuc reprehendunt ut sed,
  eu tollit nemore his. Id esse natum novum nec, usu vide voluptatibus eu.
  Ipsum affert et vim. Usu dicta soleat inimicus at, cu summo placerat mel. Possim omnesque vis ea.
  Pro an persius euripidis, semper corpora petentium per in.
  Sed eu magna dissentiet theophrastus, ei nec probo debitis, vim nusquam inciderint an.
  An pro alia tollit feugait, no quo scriptorem complectitur, no essent propriae mediocritatem pri.`,
};

const Demo = () => {

  const [msg, setMsg] = useState(data.long);
  const [font, setFont] = useState();
  const scrollHandler = useRef();

  return (
    <div style = {{ padding: '16px'}}>
      <h2> React ScrollBox </h2>
      <div style = {{margin: '16px 0'}}>
        <button onClick = {() => setMsg(data.short)} style= {{margin: '0 8px'}}>Short</button>
        <button onClick = {() => setMsg(data.long)} style= {{margin: '0 8px'}}>Long</button>
        <button onClick = {() => setFont('Courier New')} style= {{margin: '0 8px'}}>Courier New</button>
        <button onClick = {() => setFont('Consolas')} style= {{margin: '0 8px'}}>Consolas</button>
        <button onClick = {scrollToBottom} style= {{margin: '0 8px'}}>Scroll to bottom</button>
        <button onClick = {scrollToTop} style= {{margin: '0 8px'}}>Scroll to top</button>
      </div>
      <div style={{ height: '200px', width: '100%', background: '#313131', color: '#fff'}}>
        <ScrollBox fontFamily = {font} onClick = {e => alert('clicked me')} onMounted = {h => scrollHandler.current = h}>
          <div>
            {msg}
          </div>
        </ScrollBox>
      </div>
    </div>
  );

  function scrollToBottom() {
    scrollHandler.current && scrollHandler.current.scrollToBottom();
  }

  function scrollToTop() {
    scrollHandler.current && scrollHandler.current.scrollToTop();
  }

}

const root = createRoot(document.getElementById('root'));
root.render(<Demo />);
