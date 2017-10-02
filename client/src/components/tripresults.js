import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import Tripbuild from './tripbuild';
import PlacesSearch from './search';
import axios from 'axios';

import Checkbox from './checkbox';

const ROOT_URL = 'http://localhost:8080/api/v1';

const places = [];  /* This will be the object array for the real data returned from the 
                       looped Google Places API call */
const places_model = [  // Object array used for Prototyping 
  
  /* { places.name } { places.place_id } { places.price_level } { places.rating } { places.vincinity } */

  /* city = ['Paris'], country =['France'], type = ['cafe'] */

    { name:"Starbucks Coffee",
      place_id:"ChIJaaD7-R5u5kcRBQM_mYWYdHQ",
      price_level:2,
      rating:3.9,
      type:"cafe",
      vicinity:"11 Boulevard de Sébastopol, Paris" },
    { name:"Compose - Cantine sur Mesure",
      place_id:"ChIJM-MmbR5u5kcRYfCWNoZ6YOc",
      rating:4.1,
      type:"cafe",
      vicinity:"8 Rue Saint-Martin, Paris" },
    { name:"OPEN Café",
      place_id:"ChIJh6fvJx1u5kcRdcs3kDJ1Ha4",
      rating:3.5,
      type:"cafe",
      vicinity:"17 Rue des Archives, Paris" },
    { name:"Mariage Frères",
      place_id:"ChIJMdiBxQJu5kcR7FA7VaMsct4",
      price_level:1,
      rating:4.5,
      type:"cafe",
      vicinity:"30 Rue du Bourg Tibourg, Paris" },
    { name:"Starbucks Coffee",
      place_id:"ChIJkaeipR5u5kcRvaZ7Cew8DQ8",
      price_level:2,
      rating:3.7,
      type:"store",
      vicinity:"4 Rue Aubry le Boucher, Paris" },
    { name:"café le Zimmer",
      place_id:"ChIJI5HJsx9u5kcRJl41efCbOAw",
      rating:3.8,
      type:"cafe",
      vicinity:"1 Place du Châtelet, Paris" },
    { name:"Starbucks",
      place_id:"ChIJkaeipR5u5kcRdooY8c8ZpW8",
      price_level:2,
      rating:3.8,
      type:"cafe",
      vicinity:"46 Rue de Rivoli, Paris" },
    { name:"Café Beaubourg",
      place_id:"ChIJJeb6GBxu5kcRk0LhccqQWaE",
      rating:3.6,
      type:"cafe",
      vicinity:"43 Rue Saint-Merri, Paris" },
    { name:"Café de la Gare",
      place_id:"ChIJ0_cy7Bxu5kcRvNQGaVcrtCE",
      rating:4.1,
      type:"cafe",
      vicinity:"41 Rue du Temple, Paris" },
    { name:"Le Carrefour Café",
      place_id:"ChIJbYvHFR1u5kcRHS0KRbpc1_Q",
      rating:4.3,
      type:"cafe",
      vicinity:"8 Rue des Archives, Paris" },
    { name:"Little Café",
      place_id:"ChIJoXh8swJu5kcRa8Sh0Z6XiKw",
      rating:3.6,
      type:"cafe",
      vicinity:"62 Rue du Roi de Sicile, Paris" },
    { name:"Bubbolitas Paris - Bubble Tea Bar",
      place_id:"ChIJ_X-LmB5u5kcRr1bi_mc0ZJg",
      rating:4.4,
      type:"cafe",
      vicinity:"17 Rue Quincampoix, Paris" },
    { name:"La Belle Hortense",
      place_id:"ChIJseVI6QJu5kcRq2R4RZIXzYA",
      price_level:2,
      rating:4.2,
      type:"cafe",
      vicinity:"31 Rue Vieille du Temple, Paris" },
    { name:"Galerie 88",
      place_id:"ChIJp12Wk-Jx5kcR6bNE4uWLKU0",
      rating:4.6,
      type:"cafe",
      vicinity:"88 Quai de l'Hôtel de ville, Paris" },
    { name:"Bistrot Marguerite",
      place_id:"ChIJVccn-R1u5kcRF9FsB_tpRpk",
      rating:3.9,
      type:"cafe",
      vicinity:"1 Place de l'Hôtel de Ville, Paris" },
    { name:"The Caféothèque of Paris",
      place_id:"ChIJ3eCHM_1x5kcRRfrf5-yoThc",
      rating:4.3,
      type:"cafe",
      vicinity:"52 Rue de l'Hôtel de ville, Paris" },
    { name:"L'Imprévu Café",
      place_id:"ChIJ-yt9kB5u5kcR44-zfZD-i7A",
      rating:4.2,
      type:"cafe",
      vicinity:"9 Rue Quincampoix, Paris" },
    { name:"Café-Restaurant Louis Philippe",
      place_id:"ChIJyTM2z-Jx5kcREjW4IAFYiR0",
      rating:3.8,
      type:"cafe",
      vicinity:"66 Quai de l'Hôtel de ville, Paris" },
    { name:"Le Mistral",
      place_id:"ChIJ4Q02yx9u5kcRiOyVNdlFOkw",
      rating:4.3,
      type:"cafe",
      vicinity:"2 Place du Châtelet, Paris" },
    { name:"Le Verre Luisant",
      place_id:"ChIJ7am5yh1u5kcRbj-oqfk2lgw",
      rating:4.1,
      type:"cafe",
      vicinity:"64 Rue Verrerie, Paris" },
  
  /* city = ['Paris'], country =['France'], type = ['lodging'] */
  
    { name:"Hôtel Duo",
      place_id:"ChIJWU9CqB1u5kcR5P1F2SMoJmc",
      rating:4.2,
      type:"lodging",
      vicinity:"11 Rue du Temple, Paris" },
    { name:"Hôtel De Nice",
      place_id:"ChIJ2_H0Uh1u5kcR_qHEHINNe7E",
      rating:4.1,
      type:"lodging",
      vicinity:"42 Bis Rue de Rivoli, Paris" },
    { name:"Hotel France Louvre",
      place_id:"ChIJRZOcrgJu5kcRNHLaohZ3YRI",
      rating:3.6,
      type:"lodging",
      vicinity:"40 Rue de Rivoli, Paris" },
    { name:"Hôtel Saint-Merry",
      place_id:"ChIJvY0-gh5u5kcRAhJitq2g8XM",
      rating:3.9,
      type:"lodging",
      vicinity:"78 Rue de la Verrerie, Paris" },
    { name:"Hotel Paris Rivoli",
      place_id:"ChIJDWIIngJu5kcR2IuXpAp6TFs",
      rating:4,
      type:"lodging",
      vicinity:"19 Rue de Rivoli, Paris" },
    { name:"Hôtel Le Compostelle",
      place_id:"ChIJOay4ogJu5kcR6qaVUZpvdWE",
      rating:3.6,
      type:"lodging",
      vicinity:"31 Rue du Roi de Sicile, Paris" },
    { name:"Hotel Beaubourg",
      place_id:"ChIJCdHKjhxu5kcR0YtyGr7Vftc",
      rating:4.1,
      type:"lodging",
      vicinity:"11 Rue Simon le Franc, Paris" },
    { name:"Hôtel de la Bretonnerie",
      place_id:"ChIJGwxd1AJu5kcR5SMXOPEoq5Y",
      rating:4,
      type:"lodging",
      vicinity:"22 Rue Sainte-Croix de la Bretonnerie, Paris" },
    { name:"Hotel du Vieux Marais",
      place_id:"ChIJk-nr0Rxu5kcRTIqOELHySZI",
      rating:3.5,
      type:"lodging",
      vicinity:"8 Rue du Plâtre, Paris" },
    { name:"Hôtel Britannique",
      place_id:"ChIJ-4Siox9u5kcRm9vM6DcMXyU",
      rating:4.6,
      type:"lodging",
      vicinity:"20 Avenue Victoria, Paris" },
    { name:"Hôtel Elixir (ex Louvre Rivoli)",
      place_id:"ChIJD9yEph9u5kcR95X-LyEpXV0",
      rating:4.1,
      type:"lodging",
      vicinity:"7 Rue Jean Lantier, Paris" },
    { name:"Hôtel Résidence des Halles",
      place_id:"ChIJ7R5ZAh9u5kcRf-b_tJEPP-E",
      rating:4.2,
      type:"lodging",
      vicinity:"4 Rue des Halles, Paris" },
    { name:"Hôtel Saint-Louis en l´Isle",
      place_id:"ChIJnw7-O-Nx5kcRRmqhwXhpr_w",
      rating:4.1,
      type:"lodging",
      vicinity:"75 Rue Saint-Louis en l'Île, Paris" },
    { name:"Hotel De Lutèce",
      place_id:"ChIJOfF2N-Nx5kcR0iYVYvrOV-I",
      rating:4.6,
      type:"lodging",
      vicinity:"65 Rue Saint-Louis en l'Île, Paris" },
    { name:"Hotel Andrea Rivoli",
      place_id:"ChIJ-T7A1x1u5kcRBZG7UmOau8A",
      rating:3.5,
      type:"lodging",
      vicinity:"3 Rue Saint-Bon, Paris" },
    { name:"Apart Inn Paris Roi de Sicile",
      place_id:"ChIJGRWbmQJu5kcRUM6ZAZq0crU",
      type:"lodging",
      vicinity:"Rue du Roi de Sicile, Paris" },
    { name:"HÔTEL DU LOIRET",
      place_id:"ChIJOYPRSB1u5kcROW5aOqaDaIQ",
      rating:2.5,
      type:"lodging",
      vicinity:"8 Rue des Mauvais Garçons, Paris" },
    { name:"Le 1er Etage Marais",
      place_id:"ChIJZUjR3hxu5kcRI8RBqAepzBQ",
      rating:4.8,
      type:"lodging",
      vicinity:"38 Rue Sainte-Croix de la Bretonnerie, Paris" },
    { name:"Hotel Dupond - Smith",
      place_id:"ChIJWQ3QwgJu5kcRa80_dPMcbD0",
      rating:4.7,
      type:"lodging",
      vicinity:"2 Rue des Guillemites, Paris" },
    { name:"Delareynie",
      place_id:"ChIJ__-Q-hxu5kcRv9PLYLzWMlg",
      vicinity:"25 Rue du Temple, Paris",
      type:"lodging"},
  
  /* city = ['Paris'], country =['France'], type = ['store'] */
  
    { name:"At the Wonderful Doll",
      place_id:"ChIJHVtBph1u5kcR34MrNEoF5PU",
      rating:4.2,
      type:"store",
      vicinity:"9 Rue du Temple, Paris" },
    { name:"LE BHV MARAIS",
      place_id:"ChIJq9srAR1u5kcR5iOAFNIcyPo",
      rating:4.2,
      type:"store",
      vicinity:"52 Rue de Rivoli, Paris" },
    { name:"Passage du Désir",
      place_id:"ChIJ_TZugR5u5kcRbuNZbe6qNmM",
      rating:4.3,
      type:"store",
      vicinity:"11 Rue Saint-Martin, Paris" },
    { name:"Starbucks Coffee",
      place_id:"ChIJaaD7-R5u5kcRBQM_mYWYdHQ",
      price_level:2,
      rating:3.9,
      type:"store",
      vicinity:"11 Boulevard de Sébastopol, Paris" },
    { name:"France loisirs",
      place_id:"ChIJJ24Bdx5u5kcRQElE8PNuS7o",
      rating:3.7,
      type:"store",
      vicinity:"37 Rue de Rivoli, Paris" },
    { name:"Mango",
      place_id:"ChIJAY002B1u5kcRUrB35kOHp-0",
      rating:3.3,
      type:"store",
      vicinity:"4ème : Hôtel de Ville - 82, rue de Rivoli, Paris" },
    { name:"Le BHV MARAIS L'Homme",
      place_id:"ChIJy01wmB1u5kcRy0QVYxg-Ims",
      rating:4,
      type:"store",
      vicinity:"36 Rue de la Verrerie, Paris" },
    { name:"New Look",
      place_id:"ChIJM0pIKRlu5kcR3aA0UVbpXEM",
      price_level:1,
      rating:3.4,
      type:"store",
      vicinity:"PARIS. Forum des Halles, Porte Berger - 3 Place Carrée, Cedex 1 Paris" },
    { name:"Gap",
      place_id:"ChIJEZPe_h5u5kcRZcePK_z12UU",
      price_level:2,
      rating:3.6,
      type:"store",
      vicinity:"102 Rue de Rivoli, Paris" },
    { name:"Monop'",
      place_id:"ChIJmaeK8B5u5kcRB2t1fwHgQWw",
      rating:3.8,
      type:"store",
      vicinity:"6 Boulevard de Sébastopol, Paris" },
    { name:"Naturalia",
      place_id:"ChIJq8_3ihhu5kcRm1bZ4Sp-9O0",
      rating:3.7,
      type:"store",
      vicinity:"11 Rue du Renard, Paris" },
    { name:"Mariage Frères",
      place_id:"ChIJMdiBxQJu5kcR7FA7VaMsct4",
      price_level:1,
      rating:4.5,
      type:"store",
      vicinity:"30 Rue du Bourg Tibourg, Paris" },
    { name:"Starbucks Coffee",
      place_id:"ChIJkaeipR5u5kcRvaZ7Cew8DQ8",
      price_level:2,
      rating:3.7,
      type:"store",
      vicinity:"4 Rue Aubry le Boucher, Paris" },
    { name:"Fleux'",
      place_id:"ChIJF_mf4Rxu5kcRqvEyjgLgSMo",
      rating:4.1,
      type:"store",
      vicinity:"39 Rue Sainte-Croix de la Bretonnerie, Paris" },
    { name:"RoB Paris",
      place_id:"ChIJU4iMIB1u5kcR6X6zoC_Y-v0",
      rating:3.9,
      type:"store",
      vicinity:"8 Square Sainte-Croix de la Bretonnerie, Paris" },
    { name:"Supra Paris",
      place_id:"ChIJu1BMkxxu5kcR49x_o2tDTOE",
      rating:4.1,
      type:"store",
      vicinity:"45 Rue du Temple, Paris" },
    { name:"Zadig & Voltaire",
      place_id:"ChIJB76jwQFu5kcRix-BhgmXJPs",
      rating:4,
      type:"store",
      vicinity:"22 Rue du Bourg Tibourg, Paris" },
    { name:"Passage du Désir Paris le Marais",
      place_id:"ChIJ6YFUKh1u5kcR1PwLchcWGC0",
      rating:4.6,
      type:"store",
      vicinity:"23 Rue Sainte-Croix de la Bretonnerie, Paris" },
    { name:"I.E.M Distribution",
      place_id:"ChIJc6in2wJu5kcR1ZoePbFEzIo",
      rating:4.3,
      type:"store",
      vicinity:"16 Rue Sainte-Croix de la Bretonnerie, Paris" },
    { name:"Edemonium",
      place_id:"ChIJESv8whxu5kcRcejDHmm_qN8",
      rating:4.9,
      type:"store",
      vicinity:"11 Rue du Plâtre, Paris" }
];

class Tripresults extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      itins_saved: false,
      placeid: ''
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
    this.placesForAllTypes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {   

      const user_email = localStorage.getItem('userEmail');
      const cb_name = checkbox.name;
      const cb_place_id = checkbox.place_id;
      const cb_price_level = checkbox.price_level;
      const cb_rating = checkbox.rating;
      const cb_type = checkbox.type;
      const cb_vicinity = checkbox.vicinity;

      /* (CRUD) Send the user checkboxed itinerary data to the server to store the user-specific     itinerary data in the DB */

      axios.post(`${ROOT_URL}/save_itin`, { user_email, cb_name, cb_place_id, cb_price_level, cb_rating, cb_type, cb_vicinity })
      .then(response => {
        this.setState({
          itins_svaed: true
        });
      })
      .catch(err => {
        this.setState({
          itins_svaed: false
        });        
      })
    }

    this.context.router.history.push('/dashboard');
  }

  createCheckbox = (name, place_id) => (
    <Checkbox
      label={name}
      handleCheckboxChange={this.toggleCheckbox}
      key={place_id}
    />
  )

  IterateOverPlaces = () => (
    this.placesForAllTypes.add('test'),
    <PlacesSearch style={{width:'20%'}} types={['(regions)']} selectedLocation={{lat:localStorage.getItem('trip_lat'), lng:localStorage.getItem('trip_lng')}} placeid={this.state.placeid} />
  )

//  this.placesForAllTypes.add('test')

  createCheckboxes = () => (
    places_model.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="tripresults">
        <h3>Your Custom Itinerary Results</h3>
        <div className="row">
          <div className="col-sm-12">
            {this.IterateOverPlaces()}
            <form action='/dashboard' onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn btn-default" type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  itins_saved: state.itins_saved
});

export default Tripresults;
