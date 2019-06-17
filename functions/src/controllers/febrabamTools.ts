export class FebrabanTools {
  lines: any[] = [];
  type: string = ""
  
  constructor(public source: string) {}

  chooseOperation = () => {
    let result: any = {};
    this.lines = this.source.split("\n");
    switch (this.lines[0]) {
      case "010":
        result = this.registeruser();
        this.type = "usuarios"
        break;
      case "020":
        result = this.registerTouristSpot();
        this.type = "pontosTuristicos"
        break;
    //   case "030":
    //     result = this.rateTuristicSpot();
    //     break;
    //   case "040":
    //     result = this.favoritTuristicSpot();
    //     break;
    }
    return result;
  };

  registeruser = (): any => {
    let nome = "";
    let email = "";
    for (let i = 0; i < this.lines[1].length; i++) {
      if (i < 60) {
        nome += this.lines[1].charAt(i);
      } else if (i >= 60 && i < 121) {
        email += this.lines[1].charAt(i);
      }
    }
    console.log(nome);
    console.log(email);
    //salvar no banco
    return { nome, email };
  };

  registerTouristSpot = () => {
    let user = "";
    let Nome = "";
    let Descricao = "";
    let Latitude = "";
    let Longitude = "";
    let HorarioDeFuncionamento = "";
    let FaixaEtaria = "";
    let PermitePet = "";
    let PermiteTirarFoto = "";
    let Categoria = "";
    let FaixaDePreco = "";
    for (let i = 0; i < this.lines[1].length; i++) {
      if (i < 20) {
        user += this.lines[1].charAt(i);
      }
    }
    for (let i = 0; i < this.lines[2].length; i++) {
      if (i < 60) {
        Nome += this.lines[2].charAt(i);
      } else if (i >= 60 && i < 160) {
        Descricao += this.lines[2].charAt(i);
      } else if (i >= 160 && i < 170) {
        Latitude += this.lines[2].charAt(i);
      } else if (i >= 170 && i < 180) {
        Longitude += this.lines[2].charAt(i);
      } else if (i >= 180 && i < 195) {
        HorarioDeFuncionamento += this.lines[2].charAt(i);
      } else if (i >= 195 && i < 199) {
        FaixaEtaria += this.lines[2].charAt(i);
      } else if (i >= 199 && i < 200) {
        PermitePet += this.lines[2].charAt(i);
      } else if (i >= 200 && i < 201) {
        PermiteTirarFoto += this.lines[2].charAt(i);
      } else if (i >= 201 && i < 202) {
        Categoria += this.lines[2].charAt(i);
      } else if (i >= 202 && i < 203) {
        FaixaDePreco += this.lines[2].charAt(i);
      }
    }

    console.log(`usuário: ${user}`);
    console.log(`evento: ${Nome}`);
    console.log(`descrição: ${Descricao}`);
    console.log(`latitude: ${Latitude}`);
    console.log(`Longitude: ${Longitude}`);
    console.log(`HorarioDeFuncionamento: ${HorarioDeFuncionamento}`);
    console.log(`FaixaEtaria: ${FaixaEtaria}`);
    console.log(`PermitePet: ${PermitePet}`);
    console.log(`PermiteTirarFoto: ${PermiteTirarFoto}`);
    console.log(`Categoria: ${Categoria}`);
    console.log(`FaixaDePreco: ${FaixaDePreco}`);
    //salvar no banco
    return {
      user,
      Nome,
      Descricao,
      Latitude,
      Longitude,
      HorarioDeFuncionamento,
      FaixaEtaria,
      PermitePet,
      PermiteTirarFoto,
      Categoria,
      FaixaDePreco
    };
  };

  rateTuristicSpot = () => {
    let user = "";
    let turisticSpot = "";
    let rate = "";

    for (let i = 0; i < this.lines[1].length; i++) {
      if (i < 20) {
        user += this.lines[1].charAt(i);
      }
    }
    for (let i = 0; i < this.lines[2].length; i++) {
      if (i < 20) {
        turisticSpot += this.lines[2].charAt(i);
      }
    }
    for (let i = 0; i < this.lines[3].length; i++) {
      if (i < 1) {
        rate += this.lines[3].charAt(i);
      }
    }
    console.log(user);
    console.log(turisticSpot);
    console.log(rate);
    return { user, turisticSpot, rate };
  };

  favoritTuristicSpot = () => {
    let user = "";
    let turisticSpot = "";

    for (let i = 0; i < this.lines[1].length; i++) {
      if (i < 20) {
        user += this.lines[1].charAt(i);
      }
    }
    for (let i = 0; i < this.lines[2].length; i++) {
      if (i < 20) {
        turisticSpot += this.lines[2].charAt(i);
      }
    }
    console.log(user);
    console.log(turisticSpot);
    return { user, turisticSpot };
  };
}
