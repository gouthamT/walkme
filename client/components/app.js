import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { SideNav, H2, Content, Anchor, Iframe } from "./primitives";

function App() {
  const [currentPath, setCurrentPath] = useState('');
  const [commands, setCommands] = useState({});
  const links = useSelector(state => state.data.linksData);
  const frame = useRef(null);
  useEffect(() => { }, [links]);

  async function onWalkme(data) {
    setCurrentPath('');
    let { targetUrl, commands } = await fetch('/api/walkme', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data)
    }).then(res => res.json()).catch(res => { return {} });

    setCurrentPath(targetUrl);
    setCommands(commands);
    window.history.pushState(null, data.name, `${window.location.origin}/${data.name}`);
  };

  function reset() {
    setCurrentPath('');
    setCommands({});
    window.history.pushState(null, 'Home', `${window.location.origin}`);
  }

  function onLoad() {
    frame.current.contentWindow.postMessage(JSON.parse(JSON.stringify([...commands])), '*');
  }

  return <>
    <SideNav>
      <Anchor key="default" onClick={() => { reset() }}>Home</Anchor>
      {
        links && links.length > 0 &&
        links.map(link =>
          <Anchor key={link.fullPath} onClick={() => {
            onWalkme(link);
          }}>{link.name}</Anchor>)
      }
    </SideNav>
    <Content>
      {currentPath ? <Iframe ref={frame} src={currentPath} onLoad={onLoad} /> : <H2>walkme</H2>}
    </Content>
  </>;
}

export default App;