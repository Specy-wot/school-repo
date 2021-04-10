import { useEffect, useState } from 'react';
import './App.css';
import EuropeMap from "./Components/EuropeMap"
import NavBar from "./Components/NavBar"
import NationSlider from "./Components/NationSlider"
function App() {
  const [selectedNation, changeSelectedNation] = useState("Italia")
  return (
    <div class="root">
      <NavBar />

      <div className="topRow">
        <div className="welcome">
          <div className="innerWelcome" id="welcome">
            Benvenuto nell'<div className="europe">Unione Europea</div>
            <div className="mapSelectionWrapper">
              Uniti grazie al contributo di tutti, come <div className="currentNation">{selectedNation}</div>
            </div>
          </div>

        </div>
        <EuropeMap action={changeSelectedNation} />
      </div>
      <div className="row2">

        <div className="innerRow2">
          <TitleRow id="Members">Membri</TitleRow>
          <div className="nationsTextAndImages">
            <div className="words">
              Nell'anno corrente (2021) l'Unione Europea è formata da 27 stati membri, nacque inizialmente
              da un nucleo di sei paesi fondatori e si è man mano espansa fino al 2013, il numero di stati membri
              rimase stabile fino al 2020 in cui, a seguito della "Brexit", il Regno unito uscì dall'UE.
              <br/><br/>
              Ha come scopo l'incremento del benessere socio-economico e l'attenuazione delle differenze socio-economiche tra i vari stati membri attraverso l'integrazione economica, la crescita economica e il progresso scientifico e tecnologico, promuovendo la pace, i valori sociali e il benessere dei popoli europei
            </div>
            <NationSlider />
          </div>
          <div className="space"></div>
          <TitleRow id="Composition">Composizione</TitleRow>
          <div className="HQWrapper">
            <Headquarters>
              <div className="HQColumn">
                <div className="HQTitle">
                  Consiglio
                </div>
                <div className="HQText">
                  Il <b>Consiglio europeo</b> è l'istituzione dell'UE che definisce le priorità e gli orientamenti politici generali dell'Unione europea. È composto dai capi di Stato o di governo degli Stati membri, dal suo presidente e dal presidente della Commissione.
                <br /><br />
                La maggior parte delle riunioni del Consiglio si tengono a <b>Bruxelles</b>, ma in alcuni casi anche in <b>Lussemburgo</b>
                </div>
              </div>
              <img className="HQImage" src="https://www.consilium.europa.eu/staticcontent/virtual-tour/dist/council-logo.svg">
              </img>
            </Headquarters>
            <Headquarters>
              <div className="HQColumn">
                <div className="HQTitle">
                  Parlamento
                </div>
                <div className="HQText">
                  Il <b>Parlamento europeo</b> esercita la <a href="https://it.wikipedia.org/wiki/Potere_legislativo">funzione legislativa</a> dell'Unione europea assieme al Consiglio dell'Unione europea e in alcuni casi stabiliti dai trattati ha il potere di iniziativa legislativa, che generalmente spetta alla Commissione europea
                <br /><br />
                Ha sede a <b>Bruxelles</b> e <b>Strasburgo</b>
                </div>
              </div>
              <img className="HQImage" src="https://upload.wikimedia.org/wikipedia/commons/1/1e/European_Parliament_logo.svg">
              </img>
            </Headquarters>
            <Headquarters>
              <div className="HQColumn">
                <div className="HQTitle">
                  Commissione
                </div>
                <div className="HQText">
                  Alla <b>Commissione europea</b> spetta presentare <a href="https://it.wikipedia.org/wiki/Iniziativa_legislativa">proposte legislative</a>, nonché svolgere la <a href="https://it.wikipedia.org/wiki/Funzioni_esecutive">funzione esecutiva</a>, difendere gli interessi generali dell'Unione  ed  essere  la  "guardiana"  dei  Trattati,  vigilando  sull’applicazione  del  diritto dell’Unione sotto il controllo della Corte di Giustizia dell’UE
                <br /><br />
                Ha sede al <b>Palazzo Berlaymont</b>
                </div>
              </div>
              <img className="HQImage" src="https://upload.wikimedia.org/wikipedia/it/c/c6/Commissione_europea.svg">
              </img>
            </Headquarters>
          </div>
          <div className="space"></div>
          <TitleRow id="ObbiettiviEValori">Obbiettivi e valori</TitleRow>
          <div className="card" style={{ marginTop: "2rem" }}>
            <div className="targetWrapper">
              {targhets.map(target => <Target>{target}</Target>)}
            </div>
          </div>
          <div className="card">
            <div className="valueWrapper">
              {values.map(value => <Value>{value}</Value>)}
            </div>
          </div>
        </div>

      </div>
      <div className="UEFlag">

      </div>
      <div className="footer">
        <a href="https://europa.eu/european-union/index_it">
          Sito UE
        </a>
        <a href="">
          UE su Wikipedia
        </a>
        <a href="http://www.europarl.europa.eu/portal/it">
          Parlamento Europeo
        </a>
        <a href="http://www.consilium.europa.eu/it/european-council/">
          Consiglio Europeo
        </a>
        <a href="http://www.consilium.europa.eu/it/home/">
          Consiglio dell'UE
        </a>
        <a href="https://ec.europa.eu/commission/index_it">
          Commissione Europea
        </a>
      </div>
    </div>
  );
}

function Target(props) {

  return <div className="target">
    {props.children}
  </div>
}
function Value(props) {
  return <div className="value">
    <div className="valueTitle">
      {props.children.title}
    </div>
    <div className="valueBody">
      {props.children.text}
    </div>

  </div>
}
let values = [
  { title: "Dignità umana", text: "La dignità umana è inviolabile. Deve essere rispettata e tutelata e costituisce la base stessa dei diritti fondamentali." },
  { title: "Libertà", text: "La  libertà  di  movimento  conferisce  ai  cittadini  il  diritto  di  circolare  e  soggiornare liberamente nell’Unione europea. " },
  { title: "Democrazia", text: "Il funzionamento dell'UE si fonda sulla democrazia rappresentativa. Essere cittadino europeo significa anche godere di diritti politici. Ogni cittadino adulto dell’UE ha il diritto di eleggibilità e di voto alle elezioni del Parlamento europeo." },
  { title: "Diritti umani", text: "La Carta dei diritti fondamentali dell'Unione europea tutela i diritti umani, fra cui il diritto a non subire discriminazioni fondate sul sesso, la razza o l’origine etnica, la religione o le  convinzioni  personali,  la  disabilità,  l’età  o  l’orientamento  sessuale,  il  diritto  alla protezione dei dati personali e il diritto di accesso alla giustizia." },
  { title: "Uguaglianza", text: "Tutti i cittadini hanno gli stessi diritti davanti alla legge, indifferentemente da sesso o etnia" },
  
]
let targhets = [
  "Offrire libertà, sicurezza e giustizia, senza frontiere interne ",
  "Lottare contro l’esclusione sociale e la discriminazione",
  "Promuovere la pace, i suoi valori e il benessere dei suoi cittadini",
  "Promuovere il progresso scientifico e tecnologico",
  "Rafforzare la coesione economica, sociale e territoriale e la solidarietà tra gli Stati membri",
  "Rispettare la ricchezza della sua diversità culturale e linguistica",
  "Istituire un’Unione economica e monetaria con l'euro come moneta unica",
  "Favorire lo sviluppo sostenibile basato su una crescita economica equilibrata e sulla stabilità dei prezzi, sostenendo persone e ambiente"
]

function TitleRow(props) {
  return (
    <div className="titleRow toLeft" id={props.id}>
      {props.children}
    </div>
  )
}

function Headquarters(props) {
  return <div className="headquarters">
    {props.children}
  </div>
}
export default App;
