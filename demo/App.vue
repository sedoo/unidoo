<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item link @click="current = 'unidoo-alert'">
          <v-list-item-content>
            <v-list-item-title>unidoo-alert</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="current = 'unidoo-confirm-dialog'">
          <v-list-item-content>
            <v-list-item-title>unidoo-confirm-dialog</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="current = 'unidoo-crud-table'">
          <v-list-item-content>
            <v-list-item-title>unidoo-crud-table</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Unidoo components</v-toolbar-title>
    </v-app-bar>

    <unidoo-alert></unidoo-alert>
    <v-main v-if="current == 'unidoo-alert'">
      <section class="pa-5">
        <div class="text-h3 mb-1">Objectif</div>
        <p class="pa-2">Bla bla ...</p>

        <div class="text-h3 mb-1">Exemples</div>
        <p class="text-center">
          <v-btn @click="showSuccessMessage" color="success"
            >Show success message</v-btn
          >
        </p>
        <p class="text-center">
          <v-btn @click="showErrorMessage" color="error"
            >Show error message</v-btn
          >
        </p>
      </section>
    </v-main>

    <v-main v-if="current == 'unidoo-confirm-dialog'">
      <unidoo-confirm-dialog></unidoo-confirm-dialog>

      <section class="pa-5">
        <div class="text-h3 mb-1">Objectif</div>
        <p class="pa-2">Bla bla ...</p>

        <div class="text-h3 mb-1">Exemples</div>
        <p class="text-center">
          <v-btn @click="showConfirmDialog" color="primary"
            >Open Confirm Dialog</v-btn
          >
        </p>
      </section>
    </v-main>

    <v-main v-if="current == 'unidoo-crud-table'">
      <section class="pa-5">
        <div class="text-h3 mb-1">Objectif</div>
        <p class="pa-2">Bla bla ...</p>

        <div class="text-h3 mb-1">Exemples</div>
        <v-row class="justify-center">
          <v-col cols="4">
            <v-text-field
            class="pt-0"
            v-model="params.url"
            label="REST url root"
            type="text"
            :prepend-icon="'mdi-file-table-outline'"
          ></v-text-field>  
          <v-text-field
            class="pt-0"
            v-model="params.title"
            label="Table title"
            type="text"
            :prepend-icon="'mdi-file-table-outline'"
          ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn
              @click="showCrudTable(resturl)"
              :disabled="params.url ? false : true"
              >Draw table</v-btn
            >
          </v-col>
        </v-row>
        <unidoo-crud-table ></unidoo-crud-table>
      </section>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data: () => ({
    params: {
      url: "",
      title: "CRUD table title"
    },
    current: "unidoo-alert",
    drawer: null,
    links: [["unidoo-alert"]],
  }),
  methods: {
    showSuccessMessage: function () {
      this.$unidooAlert.showSuccess("Ceci est un message de succès");
    },

    showErrorMessage: function () {
      this.$unidooAlert.showError("Ceci est un message d'erreur");
    },

    showMessage: function () {
      const message = { message: "coucou", type: "success", position: "top" };
      this.$unidooAlert.show(message);
      this.$unidooAlert.showSuccess(message);
      this.$unidooAlert.showError(message);
    },

    showConfirmDialog: function () {
      this.$unidooConfirmDialog.show(this.callback);
    },

    showCrudTable: function () {
      this.$unidooCrudTable.show(this.params);
    },

    callback: function () {
      this.$unidooAlert.showSuccess("Confirmation !");
    },
  },
};
</script>