<template>
  <div class="home">
    <h1>Combien pollue ma boite mail ?</h1>
      <div id="mailContainer">
        <b-card
          v-for="(mail, index) in mails"
          :key="`mail_${index}`"
          no-body>
          <b-card-header>
            <div  class="row">
              <div class="col-lg-1">
                <b-form-checkbox
                  v-model="selected[index]"></b-form-checkbox>
              </div>
              <div class="col-lg-4">
                <h5> Objet : {{ mail.name }}</h5>
                <p> De : {{ mail.recipient }}</p>
                <p> Taille du contenu : {{mail.size}}Ko </p>
              </div>
              <div class="col-lg-3">
                <h5>Pièces jointes</h5>
                <p v-for="(joined, attachementIndex) in mail.attachements"
                  :key="`attachement_${index}_${attachementIndex}`">
                  <font-awesome-icon icon="file">
                  </font-awesome-icon> - {{ joined.name }} - {{ joined.size }}Ko
                </p>
              </div>
              <div class="col-lg-2">
                <h5>Durée de conservation : {{ duration[index] }} ans</h5>
                <b-form-input v-model="duration[index]" type="range" min="0" max="5"></b-form-input>
              </div>
              <div class="col-lg-2">
                <h5>Taille totale : {{computeMailSize(mail)}}Ko</h5>
              </div>
            </div>
          </b-card-header>
        </b-card> 
      <div  id="resultContainer">
        <h4>Votre boite mail consomme au total <b>{{ computedResult }} grammes de CO²</b>.</h4>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #resultContainer {
    padding-right: 0px;
  }
  .home {
    align-content: center;
    align-items: center;
    justify-content: center;
  }
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  mails = [];
  selected = [];
  duration = [];


  getAllMailsQuery = `
    BASE <https://data.escr.fr/wiki/Utilisateur:Mdeboffle/projet#>
    SELECT * 
      WHERE {
      ?s a <Mail> .
    }`;

  genQuery(entityName) {
    const request = `
      BASE <https://data.escr.fr/wiki/Utilisateur:Mdeboffle/projet#>
      PREFIX ex: <http://www.example.org/>
      SELECT * 
      WHERE {
      ex:${entityName} ?p ?v .
      }
    `;

    return request;
  }

  created() {
    //this.getAllMails();
    this.mails = [{name:"Newsletter",size:50,recipient:"maxime.deboffle@gmail.com",attachements:[{name:"Image",size:5000}]},{name:"Candidature",size:100,recipient:"contact@exapceo.com",attachements:[{name:"CV",size:500},{name:"LM",size:500}]},{name:"SendManga",size:100,recipient:"maxime.deboffle@exapceo.com",attachements:[{name:"Zip",size:1000}]}];
    this.mails.map(_ => {
      this.selected.push(false);
      this.duration.push(0);
    });
  }

  get computedResult() {
    let result = 0;
    for(let i = 0; i < this.selected.length; i++) {
      if (this.selected[i]) {
        let mailSize = this.computeMailSize(this.mails[i]);
        result += mailSize / 1000 * 19;
        result += mailSize / 1000 * 9.6 * this.duration[i];
      }
    }
    return result;
  }

  computeMailSize(mail) {
    return mail.size + mail.attachements.map(x => x.size).reduce((a,b) => a + b);
  }

  /* Get Datas */
  async getAllMails() {
    const mailsResults = await this.testQuery(this.getAllMailsQuery);
    mailsResults.bindings.forEach(async bs => {
      const elemUrl = bs.s.value;
      const temp = elemUrl.split('/');
      const name = temp[temp.length - 1];
      const mail = await this.fullfillMail(name);
      this.mails.push(mail);
    });
  }

  async fullfillMail(name) {
    const query = this.genQuery(name);
    const mailDatas = await this.testQuery(query);
    const mailSize = parseFloat(this.getMailSize(mailDatas));
    const mailRecipient = this.getMailRecipient(mailDatas);
    const attachements = await this.getJoined(mailDatas);
    return {
      name: name,
      size: mailSize,
      recipient: mailRecipient,
      attachements: attachements 
    };
  }

  async getJoined(mailDatas) {
    const joined = mailDatas
      .bindings
      .filter(x => x.p.value.split("/").pop() === 'contains')
      .map(x => x.v.value.split("/").pop());
    const joinedDatas = await Promise.all(joined.map(this.getFileData));
    return joinedDatas;
  }

  async getFileData(fileName) {
    const query = this.genQuery(fileName);
    const fileDatas = await this.testQuery(query);
    const fileSize = parseFloat(this.getAttachementSize(fileDatas));
    return {
      name: fileName,
      size: fileSize
    }
  }

  getAttachementSize(fileDatas) {
    return fileDatas
      .bindings
      .filter(x => x.p.value.split('#').pop() === 'AttachementSize')[0].v.value;
  }

  getMailSize(mailDatas) {
    return mailDatas
      .bindings
      .filter(x => x.p.value.split("#").pop() === 'mailSize')[0].v.value;
  }

  getMailRecipient(mailDatas) {
    return mailDatas
      .bindings
      .filter(x => x.p.value.split("#").pop() === 'mailRecipient')[0].v.value;
  }

  async testQuery(query){
      const url = new URL("https://data.escr.fr/sparql");
      const params = {
        query: query
      };

    url.search = new URLSearchParams(params)
      .toString();

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/sparql-results+json");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const result = await fetch(url, requestOptions)
        .then(response => {return response.json()})
        .catch(error => this.displayError(error));
    return result.results;
  }

  displayError(error) {
    console.log(error);
  }

}
</script>
