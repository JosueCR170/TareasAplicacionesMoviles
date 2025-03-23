// src/pages/Productos.tsx
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonCol,
  IonRow,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
} from "@ionic/react";
import { getProductos } from "../../services/productosService";
import { Product } from "../models/producto";
import { ProductoCard } from "./ProductoCard/productoCard";

export const Productos = () => {

const [items, setItems] = useState<Product[]>([]);

const addNewItems = (elements: number) => {
  const newItems = items.slice(0, elements);
  setItems((prevItems) => [...prevItems, ...newItems]);
};

  useEffect(() => {
    const fetchProductos = async () => {
      const productos = await getProductos();
      setItems(productos);
    };

    fetchProductos();
  }, []);

  

  return (
    <IonContent>
      <IonRow>
        <IonCol sizeSm="12" class="ion-padding ion-text-center">
          <IonLabel>
            <h1 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.5rem)" }}>
              Lista de Productos
            </h1>
          </IonLabel>
        </IonCol>
      </IonRow>

      <IonRow>
        {items.map((item, index) => (
          <IonCol sizeMd="4" sizeSm="6" sizeXs="12" key={index}>
            <ProductoCard item={item} />
          </IonCol>
        ))}
      </IonRow>

      <IonInfiniteScroll
        onIonInfinite={(event) => {
          addNewItems(5);
          setTimeout(() => event.target.complete(), 3000);
        }}
      >
        <IonInfiniteScrollContent loadingText="Cargando..." loadingSpinner="lines" />
      </IonInfiniteScroll>
    </IonContent>
  );
};
