<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn dark v-bind="props"> Добавить кроссовки </v-btn>
      </template>
      <v-card>
        <v-toolbar style="background-color: #56f1fd">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Добавляй педали</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="dialog = false">Сохранить</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div сlass="formAddSneakers">
          <v-form @submit.prevent="addSneaker">
            <v-row class="mt-4">
              <v-text-field
                variant="outlined"
                label="Цена"
                class="mr-3"
                v-model="sneaker.price"
              ></v-text-field>
              <v-combobox
                variant="outlined"
                label="Модель"
                no-data-text="Добавится новая модель"
                item-title="name"
                item-value="id"
                :items="allModels"
                v-model="sneaker.model"
                class="mr-3"
                >Модель</v-combobox
              >
              <v-combobox
                variant="outlined"
                label="Брэнд"
                no-data-text="Добавится новый бренд"
                class="mr-3"
                item-title="name"
                item-value="id"
                :items="allMarks"
                v-model="sneaker.mark"
                append
              >
                Брэнд
              </v-combobox>
            </v-row>

            <v-row v-for="(item, index) in sneaker.sizeCounts" :key="index">
              <v-text-field
                variant="outlined"
                label="Размер"
                class="mr-3"
                v-model="item.size"
              ></v-text-field>
              <v-text-field
                variant="outlined"
                label="Количество"
                v-model="item.count"
                class="mr-3"
              ></v-text-field>
              <v-btn @click="removeSizeCount(index)" size="x-large"
                >Удалить</v-btn
              >
            </v-row>
            <v-row class="mb-4">
              <v-btn @click="addSizeCount()">Добавить размер/количество</v-btn>
            </v-row>
            <v-row>
              <v-file-input
                label="Главное фото"
                class="mr-3"
                v-model="mainPhoto"
              ></v-file-input>
              <v-file-input label="Второе фото" v-model="two"></v-file-input>
            </v-row>
            <v-row>
              <v-file-input
                label="Третье фото"
                class="mr-3"
                v-model="three"
              ></v-file-input>
              <v-file-input
                label="Четвертое фото"
                class="mr-3"
                v-model="four"
              ></v-file-input>
            </v-row>
            <v-row>
              <v-file-input
                label="Пятое фото"
                class="mr-3"
                v-model="five"
              ></v-file-input>
              <v-file-input
                label="Шестое фото"
                class="mr-3"
                v-model="six"
              ></v-file-input>
            </v-row>
            <v-btn type="submit">Добавить педали</v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { useSneakersStore } from "~/store/sneakers";
const dialog = ref(false);
const notifications = ref(false);
const sound = ref(false);
const widgets = ref(false);
const sneaker = reactive({
  mark: null,
  model: null,
  sizeCounts: [
    {
      size: null,
      count: null,
    },
  ],
  price: null,
});

const sneakerStore = useSneakersStore();
await sneakerStore.getModels();
await sneakerStore.getMarks();

const allMarks = computed(() => {
  if (sneakerStore.marks.length === 0 && sneakerStore.loading) return [];
  else return sneakerStore.marks;
});
const allModels = computed(() => {
  if (sneakerStore.models.length === 0 && sneakerStore.loading) return [];
  else return sneakerStore.models;
});
function addSizeCount() {
  sneaker.sizeCounts.push({ size: null, count: null });
}

function removeSizeCount(index) {
  sneaker.sizeCounts.splice(index, 1);
}

const mainPhoto = ref(null);
const two = ref(null);
const three = ref(null);
const four = ref(null);
const five = ref(null);
const six = ref(null);

async function addSneaker() {
  await sneakerStore.addNewSneaker(sneaker);
  console.log("Main photo:");
  console.log(mainPhoto.value?.[0]);
  console.log(two.value?.[0]);
  console.log(four.value?.[0]);
  console.log(five.value?.[0]);
  console.log(six.value?.[0]);

  const formData = new FormData();
  formData.append("mainPhoto", mainPhoto.value[0]);
  formData.append("two", two.value[0]);
  formData.append("three", three.value[0]);
  formData.append("four", four.value[0]);
  formData.append("five", five.value[0]);
  formData.append("six", six.value[0]);
  console.log(formData);
  await sneakerStore.addPhotosSneaker(formData);

  // dialog.value = false;
  //   await clearData();
}
async function clearData() {
  sneaker.mark = null;
  sneaker.model = null;
  sneaker.price = null;
  sneaker.sizeCounts = {
    size: null,
    count: null,
  };
}
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

:deep(.v-file-input) {
  position: relative;
}
:deep(.v-file-input .v-input__prepend) {
  position: absolute;
  left: 12px;
  top: 16px;
}
:deep(.v-file-input .v-field-label) {
  margin-left: 40px;
}
:deep(.v-file-input .v-field__input) {
  margin-left: 40px;
}
</style>
