import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap';
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
      labelCidade: null
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
    console.log(this.state.arr2);

    fetch('http://192.168.42.47:8080/api/tempo', {
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

      }, 500);

    this.limpardados2();
  }


  ApiChart = () => {
    let arrayTempo = [];
    let arrayLabel = [];
    for (let j = 0; j < this.state.arrayInformaAPI.cidade.length; j++) {

      console.log(this.state.arrayInformaAPI.cidade[j]);
      arrayLabel.push(this.state.arrayInformaAPI.cidade[j]);
    }


    for (let j = 0; j < this.state.arrayInformaAPI.tempo.length; j++) {
      console.log(this.state.arrayInformaAPI.tempo[j]);
      arrayTempo.push(this.state.arrayInformaAPI.tempo[j]);

    }

    const timer = setTimeout(() => {
      this.setState({
        dataGraph: arrayTempo,
        labelCidade: arrayLabel,
        graph: true
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
      console.log(this.state.arr2);
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




  render() {

    // const numbers = [1, 2, 3, 4, 5];
    // const listItems = numbers.map((number, index) =>
    //   <input key={index} type='text' name={'test' + '' + number + ''} onChange={this.onChangeInput} />
    // );

    if (this.state.labelCidade != null && this.state.dataGraph != null) {
      return (
        <div>

          <form onSubmit={this.newSubmit}>
            {/* {listItems} */}
            <input type='text' name={'test1'} value={this.state.test1} onChange={this.onChangeInput} />
            <input type='text' name={'test2'} value={this.state.test2} onChange={this.onChangeInput} />
            <input type='text' name={'test3'} value={this.state.test3} onChange={this.onChangeInput} />
            <input type='text' name={'test4'} value={this.state.test4} onChange={this.onChangeInput} />
            <input type='text' name={'test5'} value={this.state.test5} onChange={this.onChangeInput} />
            <input type='text' name={'test6'} value={this.state.test6} onChange={this.onChangeInput} />
            <Button type='submit' > Pesquisar </Button>

          </form>
          <div className="chart">
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
        </div>
      )
    } else {
      return (
        <div>

          <form onSubmit={this.newSubmit}>
            {/* {listItems} */}
            <input type='text' name={'test1'} value={this.state.test1} onChange={this.onChangeInput} />
            <input type='text' name={'test2'} value={this.state.test2} onChange={this.onChangeInput} />
            <input type='text' name={'test3'} value={this.state.test3} onChange={this.onChangeInput} />
            <input type='text' name={'test4'} value={this.state.test4} onChange={this.onChangeInput} />
            <input type='text' name={'test5'} value={this.state.test5} onChange={this.onChangeInput} />
            <input type='text' name={'test6'} value={this.state.test6} onChange={this.onChangeInput} />
            <Button type='submit' > Pesquisar </Button>

          </form>
        </div>
      );
    }

  }
}
