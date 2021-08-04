<template>
    <v-app>
        <v-col>
            <v-radio-group
                v-model="select"
                row
            >
                <v-radio
                    label="multi entries"
                    value="multi"
                ></v-radio>
                <v-radio
                    label="other multi entries"
                    value="other"
                ></v-radio>
                <v-radio
                    label="single entry"
                    value="single"
                ></v-radio>
            </v-radio-group>
            <unidoo-player
              style="height: 610px"
              :label="label"
              :entries="values"
            ></unidoo-player>
            <a href="https://misva.aeris-data.fr/products/synopt_cartes_prevues/">* Images from MISVA web site</a>
        </v-col>
    </v-app>
</template>

<script>
import multiData from "./data/unidoo-player/multi_entries.json"
import singleData from "./data/unidoo-player/single_entry.json"
import otherMultiData from "./data/unidoo-player/other_multi.json"

export default {
    data() {
        return {
            select: 'multi',
            mapEntries: {
                multi: {
                    data: multiData,
                    label: '2021-07-29'
                },
                single: {
                    data: singleData,
                    label: '2021-08-02'
                },
                other: {
                    data: otherMultiData,
                    label: 'Custom label'
                }
            }
        };
    },
    computed:{
        label() {
            return this.mapEntries[this.select].label;
        },
        values() {
            return this.mapEntries[this.select].data;
        }
    }
};
</script>