import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

/**
 * ProductService
 * Provides an in-memory list of products for the catalog and a simple API to retrieve them.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // C'est ici que nous centralisons la liste de produits !
  // Dans une vraie app, cette liste viendrait d'une base de données.
  private products: Product[] = [
  this.createProduct("P001", "Tablette SAM 12 Pouce", "2334 DH", "tablette-sam12.jpg", "Tablettes", "Tablette légère et performante.\nÉcran 12 pouces lumineux et net.\nIdéale pour la bureautique, le multimédia et la mobilité."),
  this.createProduct("P002", "IPHONE 14 PRO", "13000 DH", "iphone14pro.jpg", "Smartphones", "iPhone 14 Pro avec écran OLED.\nExcellente autonomie et performances rapides.\nAppareil photo avancé pour photos et vidéos de qualité professionnelle."),
  this.createProduct("P003", "SMART TV 42 P", "4000 DH", "smarttv42p.jpg", "Téléviseurs", "TV 42 pouces Full HD avec couleurs vives.\nSmart TV avec applications intégrées.\nPlusieurs ports HDMI et options de connectivité réseau."),
  this.createProduct("P004", "PC Portable Gamer", "8500 DH", "pcgamer.jpeg", "Ordinateurs", "PC portable équipé d'une carte graphique dédiée.\nIdéal pour le gaming exigeant et le montage vidéo.\nRefroidissement optimisé et clavier rétroéclairé."),
    // Nouveaux produits ajoutés
    this.createProduct("P005", "Galaxy S23", "7500 DH", "galaxy-s23.jpg", "Smartphones", "Smartphone Galaxy S23 de Samsung.\nPerformance élevée pour multitâche et jeux.\nAppareil photo polyvalent pour captures nettes en toutes conditions."),
    this.createProduct("P006", "Casque Bose QC35", "2200 DH", "bose-qc35.jpg", "Audio", "Casque Bose QC35 avec réduction de bruit active.\nConfortable pour une utilisation prolongée.\nSon clair et équilibré pour musique et appels."),
    this.createProduct("P007", "Montre SAM Watch 5", "1800 DH", "sam-watch5.jpg", "Wearables", "Montre connectée SAM Watch 5.\nSuivi santé avancé et GPS intégré.\nNotifications en temps réel et autonomie confortable."),
    this.createProduct("P008", "Kindle Paperwhite", "900 DH", "kindle-paperwhite.jpg", "Livres", "Kindle Paperwhite pour une lecture sans fatigue.\nÉcran haute résolution et éclairage intégré.\nGrande autonomie pour des semaines de lecture."),
    this.createProduct("P009", "Appareil Photo Canon EOS", "6200 DH", "canon-eos.jpg", "Photo", "Canon EOS reflex numérique.\nCapteur haute définition et performance en basse lumière.\nCompatible avec une large gamme d'objectifs professionnels."),
    this.createProduct("P010", "Imprimante HP LaserJet", "1200 DH", "hp-laserjet.jpg", "Imprimantes", "Imprimante HP LaserJet compacte.\nImpression rapide et qualité professionnelle.\nConçue pour un usage domestique et de petits bureaux.")
  ];

  constructor() { }

  // Une méthode utilitaire pour créer proprement les objets (facultatif mais propre)
  private createProduct(id: string, title: string, price: string, images: string, category: string, description: string): Product {
    let p = new Product(id);
    p.productTitle = title;
    p.productPrice = price;
    p.productImage = images;
    p.category = category;
    p.productDescription = description;
    return p;
  }

  // La méthode que le composant va appeler
  public getProducts(): Product[] {
    return this.products;
  }
}
