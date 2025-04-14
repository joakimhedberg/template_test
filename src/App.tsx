import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './App.scss'

function App() {
  const [projectName, setProjectName] = useState<string>('')
  const [deliveryAddress, setDeliveryAddress] = useState<string>('')
  const [deliveryDate, setDeliveryDate] = useState<string>('')
  const [taskMaster, setTaskMaster] = useState<string>('')
  const [explVilla, setExplVilla] = useState<boolean>(false)
  const [teamsKanal, setTeamsKanal] = useState<string>('')
  const [additionalInfo, setAdditionalInfo] = useState<string>('')
  const [firstLoad, setFirstLoad] = useState(true)

  const projectType = () => {
    return explVilla? 'Expl. Villa': 'Villa'
  }

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false)
      setProjectName(localStorage.getItem('projectName') ?? '')
      setDeliveryAddress(localStorage.getItem('deliveryAddress') ?? '')
      setDeliveryDate(localStorage.getItem('deliveryDate') ?? '')
      setTaskMaster(localStorage.getItem('taskMaster') ?? '')
      setExplVilla(localStorage.getItem('explVilla') === '1')
      setTeamsKanal(localStorage.getItem('teamsKanal') ?? '')
      setAdditionalInfo(localStorage.getItem('additionalInfo') ?? '')
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocalStorage = (key: string, value: string) => {
    if (!firstLoad) {
      localStorage.setItem(key, value)
    }
  }


  useEffect(() => setLocalStorage('projectName', projectName), [projectName])
  useEffect(() => setLocalStorage('deliveryAddress', deliveryAddress), [deliveryAddress])
  useEffect(() => setLocalStorage('deliveryDate', deliveryDate), [deliveryDate])
  useEffect(() => setLocalStorage('taskMaster', taskMaster), [taskMaster])
  useEffect(() => setLocalStorage('explVilla', explVilla? '1': '0'), [explVilla])
  useEffect(() => setLocalStorage('teamsKanal', teamsKanal), [teamsKanal])
  useEffect(() => setLocalStorage('additionalInfo', additionalInfo), [additionalInfo])

  const clipboardCopy = () => {
    const result = document.getElementById('resultDiv')
    if (!result) return
    function listener(e: ClipboardEvent) {
      if (!result || !e || !e.clipboardData) {
        return
      }
      e.clipboardData.setData('text/html', result.innerHTML)
      e.clipboardData.setData('text/plain', result.innerHTML)
      e.preventDefault()
    }

    document.addEventListener('copy', listener)
    document.execCommand('copy')
    document.removeEventListener('copy', listener)
  }

  return (
    <div className="App">
      <div className="AppForm">
        <Form>
          <Form.Group>
            <Form.Label>Projektnamn</Form.Label>
            <Form.Control type='text' placeholder='Projektnamn' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            <Form.Check type='switch' label={explVilla ? 'Expl. Villa' : 'Villa'} checked={explVilla} onChange={(e) => setExplVilla(e.target.checked)} />
            <Form.Label>Leveransadress</Form.Label>
            <Form.Control type='text' placeholder='Leveransadress' value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
            <Form.Label>Leveransdatum</Form.Label>
            <Form.Control type='text' placeholder='Leveransdatum' value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
            <Form.Label>Teams-kanal</Form.Label>
            <Form.Control type='text' placeholder='Teams-kanal' value={teamsKanal} onChange={(e) => setTeamsKanal(e.target.value)} />
            <Form.Label>Uppdragsledare</Form.Label>
            <Form.Control type='text' placeholder='Uppdragsledare' value={taskMaster} onChange={(e) => setTaskMaster(e.target.value)} />
            <Form.Label>Övrig information</Form.Label>
            <Form.Control as='textarea' placeholder='Övrigt' value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
          </Form.Group>
        </Form>
      </div>
      <div className="AppResult" id='resultDiv'>
        <div className="txt_normal">Beställning {projectType()} {projectName}</div>
        <div className="bold_underline">Vänligen bekräfta att ni tagit emot beställningen</div>
        <br />
        <div className="txt_normal">Leveransadress: {deliveryAddress}</div>
        <br />
        <div className="txt_normal">Arbetshandlingar uppladdade i teams: <span className="bold_normal">{teamsKanal}</span></div>
        <div className="txt_normal">Meddela eventuella ändringar i Arbetsmiljöplan efter riskbedömning.<br />
          <span className="txt_bold_red">Skicka även in arbetsberedning innan påbörjat arbete.</span>
        </div>
        <div className="txt_normal">Klarrapportera till uppdragsledare {taskMaster} efter slutförd anslutning.</div>
        <div className="txt_normal">Önskat leveransdatum: {deliveryDate}</div>
        <div className="txt_italic">{additionalInfo}</div>
      </div>
      <div>
        <Button onClick={() => clipboardCopy()}>Kopiera</Button>
      </div>
    </div>
  );
}

export default App;
