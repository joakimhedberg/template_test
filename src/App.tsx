import  { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

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

  const highlight = (id: string) => {
    const range = document.createRange()
    range.selectNode(document.getElementById(id) as HTMLElement)
    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(range)
  }

  const copyText = () => {
    highlight('resultDiv')
    document.execCommand('copy')
    window.getSelection()?.removeAllRanges()
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLocalStorage('projectName', projectName), [projectName])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLocalStorage('deliveryAddress', deliveryAddress), [deliveryAddress])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLocalStorage('deliveryDate', deliveryDate), [deliveryDate])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLocalStorage('taskMaster', taskMaster), [taskMaster])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLocalStorage('explVilla', explVilla ? '1' : '0'), [explVilla])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLocalStorage('teamsKanal', teamsKanal), [teamsKanal])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLocalStorage('additionalInfo', additionalInfo), [additionalInfo])

  return (
    <div className="App">
      <div style={{textAlign: 'left', padding: '10px'}}>
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
      <div style={{fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", padding: '20px', border: 'solid 1px darkgray'}} id='resultDiv'>
        <div>Beställning {projectType()} {projectName}</div>
        <div style={{fontWeight: 'bold', fontSize: '14pt', textDecoration: 'underline'}}>Vänligen bekräfta att ni tagit emot beställningen</div>
        <br />
        <div>Leveransadress: {deliveryAddress}</div>
        <br />
        <div>Arbetshandlingar uppladdade i teams: <span style={{fontWeight: 'bold'}}>{teamsKanal}</span></div>
        <div>Meddela eventuella ändringar i Arbetsmiljöplan efter riskbedömning.<br />
          <span style={{fontWeight: 'bold', color: 'rgb(185, 5, 5)'}}>Skicka även in arbetsberedning innan påbörjat arbete.</span>
        </div>
        <div>Klarrapportera till uppdragsledare {taskMaster} efter slutförd anslutning.</div>
        <div>Önskat leveransdatum: {deliveryDate}</div>
        <div style={{fontStyle: 'italic', whiteSpace: 'pre'}}>{additionalInfo}</div>
      </div>
      <div>
        <Button onClick={() => copyText()}>Kopiera</Button>
      </div>
    </div>
  );
}

export default App;
