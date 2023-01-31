import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

const { commerce, image } = faker;

export function generateProduct() {
  return {
    id: uuid(),
    nombre: commerce.product(),
    precio: parseInt(commerce.price()),
    foto: image.avatar(),
  };
}
