<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Youssef Lazzouzi',
            'email' => 'youssef.lazzouzi@etu.uae.ac.ma',
            'password' => \Illuminate\Support\Facades\Hash::make('password123'),
        ]);

        $products = [
            ['productID' => "P001", 'productTitle' => "Tablette SAM 12 Pouce", 'productPrice' => "2334 DH", 'productImage' => "tablette-sam12.jpg", 'category' => "TABLETS", 'productDescription' => "Tablette légère et performante.\nÉcran 12 pouces lumineux et net.\nIdéale pour la bureautique, le multimédia et la mobilité." ],
            ['productID' => "P002", 'productTitle' => "IPHONE 14 PRO", 'productPrice' => "13000 DH", 'productImage' => "iphone14pro.jpg", 'category' => "SMARTPHONES", 'productDescription' => "iPhone 14 Pro avec écran OLED.\nExcellente autonomie et performances rapides.\nAppareil photo avancé pour photos et vidéos de qualité professionnelle." ],
            ['productID' => "P003", 'productTitle' => "SMART TV 42 P", 'productPrice' => "4000 DH", 'productImage' => "smarttv42p.jpg", 'category' => "TELEVISIONS", 'productDescription' => "TV 42 pouces Full HD avec couleurs vives.\nSmart TV avec applications intégrées.\nPlusieurs ports HDMI et options de connectivité réseau." ],
            ['productID' => "P004", 'productTitle' => "PC Portable Gamer", 'productPrice' => "8500 DH", 'productImage' => "pcgamer.jpeg", 'category' => "COMPUTERS", 'productDescription' => "PC portable équipé d'une carte graphique dédiée.\nIdéal pour le gaming exigeant et le montage vidéo.\nRefroidissement optimisé et clavier rétroéclairé." ],
            ['productID' => "P005", 'productTitle' => "Galaxy S23", 'productPrice' => "7500 DH", 'productImage' => "galaxy-s23.jpg", 'category' => "SMARTPHONES", 'productDescription' => "Smartphone Galaxy S23 de Samsung.\nPerformance élevée pour multitâche et jeux.\nAppareil photo polyvalent pour captures nettes en toutes conditions." ],
            ['productID' => "P006", 'productTitle' => "Casque Bose QC35", 'productPrice' => "2200 DH", 'productImage' => "bose-qc35.jpg", 'category' => "AUDIO", 'productDescription' => "Casque Bose QC35 avec réduction de bruit active.\nConfortable pour une utilisation prolongée.\nSon clair et équilibré pour musique et appels." ],
            ['productID' => "P007", 'productTitle' => "Montre SAM Watch 5", 'productPrice' => "1800 DH", 'productImage' => "sam-watch5.jpg", 'category' => "WEARABLES", 'productDescription' => "Montre connectée SAM Watch 5.\nSuivi santé avancé et GPS intégré.\nNotifications en temps réel et autonomie confortable." ],
            ['productID' => "P008", 'productTitle' => "Kindle Paperwhite", 'productPrice' => "900 DH", 'productImage' => "kindle-paperwhite.jpg", 'category' => "BOOKS", 'productDescription' => "Kindle Paperwhite pour une lecture sans fatigue.\nÉcran haute résolution et éclairage intégré.\nGrande autonomie pour des semaines de lecture." ],
            ['productID' => "P009", 'productTitle' => "Appareil Photo Canon EOS", 'productPrice' => "6200 DH", 'productImage' => "canon-eos.jpg", 'category' => "PHOTO", 'productDescription' => "Canon EOS reflex numérique.\nCapteur haute définition et performance en basse lumière.\nCompatible avec une large gamme d'objectifs professionnels." ],
            ['productID' => "P010", 'productTitle' => "Imprimante HP LaserJet", 'productPrice' => "1200 DH", 'productImage' => "hp-laserjet.jpg", 'category' => "PRINTERS", 'productDescription' => "Imprimante HP LaserJet compacte.\nImpression rapide et qualité professionnelle.\nConçue pour un usage domestique et de petits bureaux." ]
        ];

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
