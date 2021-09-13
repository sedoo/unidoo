<template>
  <div>
    <v-alert v-if="error == true" dense outlined type="error"
      >Please enter a valid REST url root</v-alert
    >

    <v-data-table
      v-if="url && error == false"
      :headers="columns"
      :items="alldata"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!onlyUpdate"
            color="blue"
            dark
            min-width="150px"
            @click="addItem"
            >Create Item</v-btn
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-dialog
            v-model="itemDialog"
            max-width="1000px"
            style="z-index: 1000"
          >
            <v-card>
              <v-card-title>
                <span class="headline">{{ titleEdit }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      v-for="(field, index) in Object.keys(defaultItem)"
                      :key="index"
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-if="typeof editedItem[field] == 'number'"
                        v-model="editedItem[field]"
                        :label="field"
                        type="number"
                      ></v-text-field>
                      <v-switch
                        v-if="typeof editedItem[field] == 'boolean'"
                        v-model="editedItem[field]"
                        flat
                        :label="`${editedItem[field].toString()}`"
                      ></v-switch>
                      <v-text-field
                        v-else
                        v-model="editedItem[field]"
                        :label="field"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="blue" @click="close()">Cancel</v-btn>
                <v-btn dark color="success" @click="saveItem()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="itemDeleteDialog"
            max-width="1000px"
            style="z-index: 1000"
          >
            <v-card flat>
              <v-card-title>
                <span class="headline"
                  >Are you sure you want to delete this item ?</span
                >
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="blue" @click="close">Cancel</v-btn>
                <v-btn dark color="red darken-1" @click="deleteThisItem()"
                  >Yes</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="blue" class="ma-2" @click="editItem(item)">edit</v-icon>
        <v-icon
          v-if="!onlyUpdate"
          color="red"
          class="ma-2"
          @click="deleteItem(item)"
          >delete</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
import Plugin from "../plugin.js";

export default {
  props: {
    onlyUpdate: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
  computed: {
    titleEdit() {
      return this.editedItemIndex == -1 ? "Add new item" : "Edit item";
    },
  },
  data() {
    return {
      search: "",
      itemDialog: false,
      itemDeleteDialog: false,
      editedItemIndex: -1,
      alldata: [],
      editedItem: {},
      defaultItem: {},
      tabledata: [],
      uniquesourcevalues: [],
      error: false,
    };
  },
  watch: {
    itemDialog(val) {
      val || this.close();
    },
    itemDeleteDialog(val) {
      val || this.close();
    },
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      this.alldata = [];

      this.axios
        .get(this.url)
        .then((res) => {
          this.error = false;
          this.alldata = res.data;
          Object.keys(this.alldata[0]).forEach((key) => {
            if (key !== "id") {
              this.defaultItem[key] = null;
              this.editedItem[key] = null;
            }
          });
        })
        .catch(() => {
          this.error = true;
        });
    },
    close() {
      this.itemDialog = false;
      this.itemDeleteDialog = false;
      this.editedItem = this.defaultItem;
      this.editedItemIndex = -1;
    },
    addItem() {
      this.editedItemIndex = -1;
      this.itemDialog = true;
    },
    editItem(item) {
      this.editedItemIndex = this.alldata.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.itemDialog = true;
    },
    deleteItem(item) {
      this.itemDeleteDialog = true;
      this.editedItemIndex = this.alldata.indexOf(item);
    },
    deleteThisItem() {
      this.axios
        .delete(this.url + "/delete/" + this.alldata[this.editedItemIndex].id)
        .then(() => {
          this.axios.get(this.url).then((res) => (this.alldata = res.data));
        })
        .then(() => this.close());
    },
    saveItem() {
      if (this.editedItemIndex > -1) {
        this.axios
          .put(this.url + "/update", this.editedItem)
          .then(() => {
            this.axios.get(this.url).then((res) => (this.alldata = res.data));
          })
          .then(() => this.close());
      } else {
        this.axios
          .post(this.url + "/create", this.editedItem)
          .then(() => {
            this.axios.get(this.url).then((res) => (this.alldata = res.data));
          })
          .then(() => this.close());
      }
    },
  },
};
</script>
<style  scoped>
</style>