import React from "react";
import Head from 'next/head';
import Header from '../../src/components/Header';
import Anuncios from './Anuncios';

export default function InfosScreen({}) {
	<Head>
        <title>Anúncios</title>
        <link rel="icon" href="/car-solid.png" />
	</Head>
	
  	return (
	  	<div>
			<Header/>
			<Anuncios/>
		</div>
	)
}