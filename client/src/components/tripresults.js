import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Tripresults extends Component {
  constructor(props) {
    super(props);
  }    
  state = {};

  static contextTypes = {
    router: PropTypes.object
  };

 onClick () {
    this.context.router.history.push('/tripbuild');
  }

  render() {
    return ( 
      <div className='tripresults'>
        <h3>Your Custom Itinerary Results</h3>
        <form action='/'>
          <div className='form-group'>
            <label className='col-md-2 control-label' for='Checkboxes'></label>  
            <div className='col-md-10 columns'>
              <p><strong>This area will continue the custom itinerary results return form the Google Places API call and the filter operation from the MyTripBuild selections</strong></p>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                 sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
                 vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                 Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
                 elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor
                 eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
                 feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
                 Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam
                semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
                pulvinar, hendrerit id, lorem. Maecenas nec
                 odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis
                  ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit
                   amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue
                   velit cursus nunc, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                 sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
                 vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                 Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
                 elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor
                 eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
                 feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
                 Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam
                semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
                pulvinar, hendrerit id, lorem. Maecenas nec
                 odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis
                  ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit
                   amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue
                   velit cursus nunc, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                 sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
                 vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                 Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
                 elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor
                 eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
                 feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
                 Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam
                semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
                pulvinar, hendrerit id, lorem. Maecenas nec
                 odio et ante tincidunt tempus.</p>
            </div>
          </div>
          <button className='btn btn-default' type='submit'>Save Your Custom Itinarary</button>
        </form>
        <button onClick={this.onClick.bind(this)} className='btn btn-default'>Back</button>
      </div>
    );
  }
}

const mapStatetoProps = state => ({});

export default connect(mapStatetoProps)(Tripresults);