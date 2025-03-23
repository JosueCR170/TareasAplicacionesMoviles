import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItem,
} from "@ionic/react";
import { Product } from "../../models/producto";
import "./productoCardStyles.css";

interface ProductoCardProps {
  item: Product;
}

export const ProductoCard: React.FC<ProductoCardProps> = ({ item }) => {
  return (
    <IonItem className="custom-item">
      <IonCard className="card">
        <div className="card-content">
          <img
            alt="img product"
            src={item.image}
            className="card-img"
          />
        </div>

        <IonCardHeader className="card-header">
          <IonCardTitle className="card-title">{item.title}</IonCardTitle>
          <IonCardSubtitle className="card-subtitle">
            ${item.price}
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    </IonItem>
  );
};
