import React from "react";
import CarouselHome from "./components/CarouselHome";
var axios = require("axios");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: null,
      brand: null,
      models: null,
      model: null,
      years: null,
      year: null,
      versions: null,
      version: null,
      versionId: null
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
    let year = e.target.value;
    this.setState({ year: year });
    let model = this.state.model;
    let brand = this.state.brand;
    axios
      .get(
        `https://volanty-price-api.herokuapp.com/brands/${brand}/models/${model}/years/${year}/versions`
      )
      .then(data => this.setState({ versions: data.data }));
  };

  getCar = e => {
    let year = this.state.year;
    let model = this.state.model;
    let brand = this.state.brand;
    let versionId = e.target.value;
    this.setState({ versionId: versionId });

    axios
      .get(
        `https://volanty-price-api.herokuapp.com/brands/${brand}/models/${model}/years/${year}/versions/${versionId}`
      )
      .then(data => this.setState({ versionId: data.data }));
  };

  getPrice = () => {
    let year = this.state.year;
    let model = this.state.model;
    let brand = this.state.brand;
    let versionId = this.state.versionId;
    this.setState({ versionId: versionId });
    console.log(brand, model, year, versionId);
    axios
      .get(
        `https://volanty-price-api.herokuapp.com/brands/${brand}/models/${model}/years/${year}/versions/${versionId}`
      )
      .then(data => console.log({ versionId: data.data.precoMedio }));
  };

  //exemplo para navegar no retorno ======
  getFullData = () => {
    let brand = "FORD";
    let model = "KA";
    let year = "2018";
    let version = "d1fc709679212da44303cdc1c019054e";
    axios
      .get(
        `https://volanty-price-api.herokuapp.com/brands/${brand}/models/${model}/years/${year}/versions/${version}`
      )
      .then(data => console.log(">>>>>", data.data.precoMedio));
  };
  //exemplo para navegar no retorno ======

  render() {
    return this.state.brands ? (
      <div>
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
          ""
        )}

        <div>
          <select onChange={this.getVersion}>
            {this.state.years
              ? this.state.years.map((year, i) => (
                  <option key={i} value={year}>
                    {year}
                  </option>
                ))
              : ""}
          </select>
        </div>

        <div>
          <select onChange={this.getCar}>
            {this.state.versions
              ? this.state.versions.map((version, i) => (
                  <option key={i} value={version.versionId}>
                    {version.version}
                  </option>
                ))
              : ""}
          </select>
        </div>

        <button onClick={this.getPrice}>VER O PREÇO</button>
      </div>
    ) : (
      ""
    );
  }
}
