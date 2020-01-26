import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
var axios = require("axios");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: null,
      brand: null,
      models: null,
      model: null,
      years: ""
    };
  }

  //Executado na criação do componente (Página) - executado de forma instantanea
  componentDidMount() {
    axios
      .get("https://volanty-price-api.herokuapp.com/brands")
      .then(data => this.setState({ brands: data.data }));
  }

  getModel = e => {
    let brandSelected = e.target.value;
    this.setState({ brand: brandSelected });
    axios
      .get(
        `https://volanty-price-api.herokuapp.com/brands/${brandSelected}/models`
      )
      .then(data => this.setState({ models: data.data }));
  };

  getYear = e => {
    let model = e.target.value;
    this.setState({ model: model });
    let brand = this.state.brand;
    axios
      .get(
        `https://volanty-price-api.herokuapp.com/brands/${brand}/models/${model}/years`
      )
      .then(data => this.setState({ years: data.data }));
  };

  getVersion = e => {
    let version = e.target.value;
    this.setState({ versions: version });
  };

  //exemplo para navegar no retorno
  getFullData = () => {
    let brand = "FORD";
    let model = "KA";
    let year = "2018";
    let version = "d1fc709679212da44303cdc1c019054e";
    axios
      .get(
        `https://volanty-price-api.herokuapp.com/brands/${brand}/models/${model}/years/${year}/versions/${version}`
      )
      .then(batata => console.log(">>>>>", batata.data.precoMedio));
  };
  //exemplo para navegar no retorno

  render() {
    return this.state.brands ? (
      <div>
        <button onClick={this.getFullData}>GET FULL</button>
        <select onChange={this.getModel}>
          {this.state.brands ? (
            this.state.brands.map((brand, i) => (
              <option key={i} value={brand}>
                {brand}
              </option>
            ))
          ) : (
            <option>Selecione uma marca</option>
          )}
        </select>
        {this.state.models ? (
          <div>
            <h1>SELECIONE O 2º</h1>
            <select onChange={this.getYear}>
              {this.state.models ? (
                this.state.models.map((model, i) => (
                  <option key={i} value={model}>
                    {model}
                  </option>
                ))
              ) : (
                <div>Não tem modelo</div>
              )}
            </select>
          </div>
        ) : (
          " "
        )}
        <div>
          {this.state.years ? (
            this.state.years.map((year, i) => <p key={i}>{year}</p>)
          ) : (
            <p> Nao tem nao</p>
          )}
        </div>
      </div>
    ) : (
      "Nao tenho"
    );
  }
}

/*
function App(){
  return (
    
    
      <>
      <DropdownButton id="dropdown-basic-button" title="MARCA">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>

      <DropdownButton id="dropdown-basic-button" title="MODELO">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
      <DropdownButton id="dropdown-basic-button" title="ANO">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
      </>
    );
}

axios.get ("https://volanty-price-api.herokuapp.com/brands").then (function(data){
  console.log(data);
});

export default App;
*/
