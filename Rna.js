function intervaloAleatorio(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function interpolar(a, b, t) {
    return a + (b - a) * t;
  }
  
  class Neuronio {
    constructor(entradas) {
      this.viés = intervaloAleatorio(-1, 1);
      this.listaDePesos = new Array(entradas).fill().map(() => intervaloAleatorio(-1, 1));
    }
  
    g(listaDeSinais = []) {
      let u = 0;
      for (let i = 0; i < this.listaDePesos.length; i++) {
        u += listaDeSinais[i] * this.listaDePesos[i];
      }
      if (Math.tanh(u) > this.viés) return 1;
      else return 0;
    }
  
    mutar(taxa = 0.2) {
      this.listaDePesos = this.listaDePesos.map((p) => {
        return interpolar(p, intervaloAleatorio(-1, 1), taxa);
      });
      this.viés = interpolar(this.viés, intervaloAleatorio(-1, 1), taxa);
    }
  }
  
  function intervaloAleatorio(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function interpolar(a, b, t) {
    return a + (b - a) * t;
  }
  
  class RNA {
    constructor(contagemDeEntradas = 1, listaDeNíveis = []) {
      this.pontuação = 0;
      this.listaDeNíveis = listaDeNíveis.map((n, i) => {
        const tamanhoDeEntrada = i === 0 ? contagemDeEntradas : listaDeNíveis[i - 1];
        return new Array(n).fill().map(() => new Neuronio(tamanhoDeEntrada));
      });
    }
  
    calcular(lista = []) {
      for (let i = 0; i < this.listaDeNíveis.length; i++) {
        const listaTemp = [];
        for (const neuronio of this.listaDeNíveis[i]) {
          if (lista.length !== neuronio.listaDePesos.length) throw new Error('Entrada Inválida!');
          listaTemp.push(neuronio.g(lista));
        }
        lista = listaTemp;
      }
      return lista;
    }
  
    mutar(taxa = 1) {
      for (const nivel of this.listaDeNíveis) {
        for (const neuronio of nivel) neuronio.mutar(taxa);
      }
    }
  
    carregar(rna) {
      if (!rna) return;
      try {
        this.listaDeNíveis = rna.map((listaDeNeuronios) => {
          return listaDeNeuronios.map((neuronio) => {
            const n = new Neuronio();
            n.viés = neuronio.viés;
            n.listaDePesos = neuronio.listaDePesos;
            return n;
          });
        });
      } catch (e) {
        console.error('Erro ao carregar RNA:', e);
      }
    }
  
    salvar() {
      return this.listaDeNíveis;
    }
  }
  
  export default RNA;
  