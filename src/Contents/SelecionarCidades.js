import React, { Component } from 'react'
import { Button, Table, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';

export default class Cidades extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      test1: '',
      test2: '',
      test3: '',
      test4: '',
      test5: '',
      test6: '',
      newCtc: {},
      ctcList: [],
      arr: [],
      arr2: [],
      itens: [],
      graph: false,
      arrayInformaAPI: '',
      dataGraph: null,
      labelCidade: null,
      sunsethour: null,
      sunrisehour: null,
      tempoCity: null,
      displayForm: 'none',
      displayGraphContent: 'none'
    }
  }


  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'City'
  }

  selecionarCidades = () => {
    var dadosapi;

    fetch('http://localhost:8080/api/tempo', {
      method: 'POST',
      body: JSON.stringify({
        cidade: this.state.arr2
      }),
      headers: { "Content-Type": "application/json" }
    }).then((response) => response.json())
      .then((rows) => {
        if (rows.erro) {
          alert('Cidade não encontrada');
        } else {
          this.setState({
            arrayInformaAPI: rows,
          })
          this.ApiChart();
        }

      }, 1000);

    this.limpardados2();
  }


  ApiChart = () => {
    let arrayTempo = [];
    let arrayLabel = [];
    let arraySunset = [];
    let arraySunrise = [];
    let newArr = [];

    console.log(this.state.arrayInformaAPI)//log que apresenta api com os resultados

    for (let j = 0; j < this.state.arrayInformaAPI.cidade.length; j++) {

      arrayLabel.push(this.state.arrayInformaAPI.cidade[j]);
      newArr.push(this.state.arrayInformaAPI.cidade[j], this.state.arrayInformaAPI.tempo[j])
    }


    for (let j = 0; j < this.state.arrayInformaAPI.tempo.length; j++) {
      arrayTempo.push(this.state.arrayInformaAPI.tempo[j]);

    }


    for (let j = 0; j < this.state.arrayInformaAPI.horassunrise.length; j++) {
      arraySunrise.push(this.state.arrayInformaAPI.horassunrise[j]);
    }

    for (let j = 0; j < this.state.arrayInformaAPI.horassunset.length; j++) {
      arraySunset.push(this.state.arrayInformaAPI.horassunset[j]);
    }


    const timer = setTimeout(() => {
      this.setState({
        dataGraph: arrayTempo,
        labelCidade: arrayLabel,
        graph: true,
        sunsethour: arraySunset,
        sunrisehour: arraySunrise,
        tempoCity: newArr,
      })
    }, 500);

  }


  onChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  newSubmit = (e) => {
    e.preventDefault();

    this.setState({
      displayForm: 'none',
      displayGraphContent: 'block'
    })

    this.state.arr.push(this.state.test1, this.state.test2, this.state.test3, this.state.test4, this.state.test5, this.state.test6)
    for (let i = 0; i <= 5; i++) {

      if (this.state.arr[i] === "") {
        this.setState({
          arr: [],
        })
      } else {
        this.enviaCidades();
        this.state.arr2.push(this.state.arr[i])
      }
    }



  }

  enviaCidades = () => {
    const timer = setTimeout(() => {
      const timer = setTimeout(() => {
        this.selecionarCidades();
      }, 500);
      this.limpardados();
    }, 500);
  }

  limpardados = () => {
    const timer = setTimeout(() => {
      this.setState({
        arr: [],
      })

    }, 400);
  }
  limpardados2 = () => {
    const timer = setTimeout(() => {
      this.setState({
        arr2: [],
      })

    }, 400);
  }
  limparinputs = () => {
    const timer = setTimeout(() => {
      this.setState({
        test1: '',
        test2: '',
        test3: '',
        test4: '',
        test5: '',
        test6: '',
      })
    }, 400);
  }



  OrdenarFunc = () => {


    const timer = setTimeout(() => {
      this.setState({
        dataGraph: null,
      });
    }, 500);
    this.mudarGraph();
  }

  mudarGraph = () => {

    let arrayCerto = this.state.dataGraph;
    arrayCerto.sort();


    const timer = setTimeout(() => {
      this.setState({
        dataGraph: arrayCerto,
      });
    }, 500);
  }

  MostrarInput = () => {
    this.setState({
      displayForm: 'block',
      displayGraphContent: 'none'
    })
  }
  render() {

    // const numbers = [1, 2, 3, 4, 5];
    // const listItems = numbers.map((number, index) =>
    //   <input key={index} type='text' name={'test' + '' + number + ''} onChange={this.onChangeInput} />
    // );




    if (this.state.labelCidade != null && this.state.dataGraph != null && this.state.sunrisehour != null && this.state.sunsethour != null) {


      const numbers = this.state.sunrisehour;
      const listar_horas = numbers.map((number, index) =>
        <td key={index}>{number}</td>
      );

      const numbers2 = this.state.sunsethour;
      const listar_horassunset = numbers2.map((number, index) =>
        <td key={index}>{number}</td>
      );

      const numbers3 = this.state.arrayInformaAPI.cidade;
      const listar_cidades = numbers3.map((number, index) =>
        <td key={index}>{number}</td>
      );

      

      return (
        <div>

          <form style={{ display: this.state.displayForm }} onSubmit={this.newSubmit}>

            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test1'} value={this.state.test1} onChange={this.onChangeInput} />
            </InputGroup>

            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test2'} value={this.state.test2} onChange={this.onChangeInput} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test3'} value={this.state.test3} onChange={this.onChangeInput} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test4'} value={this.state.test4} onChange={this.onChangeInput} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test5'} value={this.state.test5} onChange={this.onChangeInput} />
            </InputGroup >
            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test6'} value={this.state.test6} onChange={this.onChangeInput} />
            </InputGroup >
            <Button type='submit' > Pesquisar </Button>

          </form >

          <Button id="btn_inserir_novo" type='submit' onClick={this.MostrarInput}> Inserir de novo </Button>
          <Button id="btn_ordenar" type='submit' onClick={this.OrdenarFunc} > Ordenar Temperatura </Button>

          <div className="chart" style={{ display: this.state.displayGraphContent }}>
            <Bar

              data={{
                labels: this.state.labelCidade,
                datasets: [{
                  label: "ºC",
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: this.state.dataGraph,
                }]
              }}
              options={{
                title: {
                  display: this.props.displayTitle,
                  text: 'Meteorologia ',
                  fontSize: 25
                },

              }}
            />


          </div>

          <Table >
            <thead>
              <tr>
                <th>Cidade</th>
                {listar_cidades}
              </tr>
              <tr>
                <th>Hora do nascer do sol</th>

                {listar_horas}

              </tr>
            </thead>
            <tbody>


              <tr>
                <th>Hora do pôr do sol</th>
                {listar_horassunset}
              </tr>


            </tbody>
          </Table>
        </div>
      )
    } else {

      return (
        <div>

          <form onSubmit={this.newSubmit}>

            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test1'} value={this.state.test1} onChange={this.onChangeInput} />
            </InputGroup>

            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test2'} value={this.state.test2} onChange={this.onChangeInput} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test3'} value={this.state.test3} onChange={this.onChangeInput} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test4'} value={this.state.test4} onChange={this.onChangeInput} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test5'} value={this.state.test5} onChange={this.onChangeInput} />
            </InputGroup >
            <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input name={'test6'} value={this.state.test6} onChange={this.onChangeInput} />
            </InputGroup >
            <Button type='submit' > Pesquisar </Button>

          </form >
        </div >
      );
    }

  }
}
