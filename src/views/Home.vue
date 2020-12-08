<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <li v-for="i in mails" v-bind:key="i.name">{{ i.name }} - {{ i.size }}Ko</li>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  mails = [];

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
    this.getAllMails();
  }

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
