<template>
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
      <v-btn @click="removeSizeCount(index)" size="x-large">Удалить</v-btn>
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
    <v-btn type="submit">{{ modalProps.title }} педали</v-btn>
  </v-form>
</template>
<script setup>
import { useSneakersStore } from "~/store/sneakers";

const modalProps = defineProps({
  oneSneaker: {
    type: Object,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
});
// console.log("SSSSSSSS:", modalProps.oneSneaker);
const sneaker = reactive({
  mark: (modalProps.oneSneaker && modalProps.oneSneaker.Mark.name) || null,
  model: (modalProps.oneSneaker && modalProps.oneSneaker.name) || null,
  sizeCounts: (modalProps.oneSneaker &&
    modalProps.oneSneaker.Sizes.map((item) => ({
      size: item.size,
      count: item.count,
    }))) || [
    {
      size: null,
      count: null,
    },
  ],
  price: modalProps.oneSneaker ? modalProps.oneSneaker.price : null,
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

const mainPhoto = ref(
  (modalProps.oneSneaker.Photos &&
    modalProps.oneSneaker.Photos.map((el) => el.mainPhoto)) ||
    null
);
const two = ref(
  (modalProps.oneSneaker.Photos &&
    modalProps.oneSneaker.Photos.map((el) => el.two)) ||
    null
);
const three = ref(
  (modalProps.oneSneaker.Photos &&
    modalProps.oneSneaker.Photos.map((el) => el.three)) ||
    null
);
const four = ref(
  (modalProps.oneSneaker.Photos &&
    modalProps.oneSneaker.Photos.map((el) => el.four)) ||
    null
);
const five = ref(
  (modalProps.oneSneaker.Photos &&
    modalProps.oneSneaker.Photos.map((el) => el.five)) ||
    null
);
const six = ref(
  (modalProps.oneSneaker.Photos &&
    modalProps.oneSneaker.Photos.map((el) => el.six)) ||
    null
);
console.log(
  "photo",
  modalProps.oneSneaker.Photos.map((el) => el.mainPhoto)
);
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
}
// async function clearData() {
//   sneaker.mark = null;
//   sneaker.model = null;
//   sneaker.price = null;
//   sneaker.sizeCounts = {
//     size: null,
//     count: null,
//   };
// }
</script>
<style scoped>
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
