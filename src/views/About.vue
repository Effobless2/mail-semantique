<template>
  <div class="about">
    <div class="content">
      <h1>La pollution Générée par les emails</h1>
      <p class="introduction">
        Au jour d'aujourd'hui, les services administratifs et entreprises informatisent 
        l'ensemble de leurs documents et entament depuis plus d'une dizaine d'année une <b>Digitalisation des services</b>.
        Cette migration digitale permet un assouplissement de l'accès des données mais a également un aspect écologique, 
        notamment par rapport à la protection des arbres en réduisant la production de papier.
      </p>

      <p>
        Cependant, cette digitalisation n'est pas <b class="green">verte</b> pour autant. En effet, l'utilisation d'internet
        nécessite la mise en place de serveurs aux quatre coins du globe. Ces derniers ont pour rôle de traiter les requêtes
        mais également de stocker les données circulant sur la toile, générant ainsi des consommations d'énergie des émissions de CO².
        Aujourd'hui, <b>78% des datas stockées dans les serveurs sont des Mails</b>, dont la plupart ne seront jamais lus (spams, newsletters, etc).
        En effet, les mails sont la manière la plus populaire afin d'échanger des informations : rapidité de réception, simplicité de réalisation et,
        la plupart du temps, gratuit. Aujourd'hui, un français recevrait environs 936 newsletters par an générant ainsi 9 kilos de CO². 
        En moyenne, l'émission d'un mail d'1 Mo (mail contenant une image par exemple) génère en moyenne 19 grammes de CO². 
        34 Millions de mails sont envoyés chaque année en France, générant l'équivalent de 14 tonnes de pétroles.
        De plus, le stockage d'un seul mail durant 1 an génère en moyenne 9.6g de CO2. à ce rythme, repasser au papier risque 
        de devenir moins néfaste pour l'environnement.
      </p>

      <p>
        Dans cette problématique, nous sommes tous concernés et nous pouvons tous faire quelque chose afin de diminuer cette 
        émission de CO² : trier ses mails, les supprimer rapidement et enregistrer les pièces jointes sur nos ordinateurs.
        Cependant, comme dit précédemment, nous sommes tous assaillis par une quantité faramineuse de mails chaque jour, 
        comment pouvons-nous trier ces mails dans des condidtions pareilles ?! Certains logiciels ont été justement conçus pour vous :
      </p>
      <ul>
        <li>Mail Cleaner : Outil addressé aux professionnels afin de détecter et de supprimer les spams au sein de leur boite mail.</li>
        <li>CleanFox : Logiciel addressé à tous vous permettant de trier rapidement votre boite mail et de supprimer les newsletters non désirées en un clic.</li>
        <li>Et bien d'autres ...</li>
      </ul>

      <p class="conclusion">
        Avec ces petits gestes, nous pourrions réduire la pollution digitale généree par les mails d'au moins 60% et la quantité de
        serveurs de stockage pourra également être réduit, et ainsi, réduire la consommation électrique des plateformes.
      </p>

      <h5>Sources :</h5>
      <ul>
        <li>
          <a 
            href="https://www.grizzlead.com/lincroyable-impact-de-la-pollution-numerique-et-les-bonnes-pratiques-a-adopter-tres-vite/">
            Greezland
          </a>
        </li>
        <li>
          <a
            href="https://medium.com/@raindrift/how-big-is-email-305bbdb69776">
            Medium
          </a>
        </li>
        <li>
          <a
            href="https://www.cleanfox.io/fr/">
            CleanFox
          </a>
        </li>
        <li>
          <a 
            href="https://www.mailcleaner.net/fr/">
            MailCleaner
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  .content > p, .about > ul, .about > h5 {
    text-align: justify;
  }

  .content {
    background: white;
    padding: 20px;
  }

  .about {
    padding: 0% 20%;
  }

  .green {
    color: green;
  }
  .introduction {
    font-style: italic;
  }
  .conclusion {
    font-weight: bolder;
  }
  .about {
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('https://i.pinimg.com/originals/bc/81/bf/bc81bfb35daa7955c4304277b5eb606e.jpg');
  }
</style>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {
  
}
</script>