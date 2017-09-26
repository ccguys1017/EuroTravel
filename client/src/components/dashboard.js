import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }    
  state = {
  };

  static contextTypes = {
    router: PropTypes.object
  };

 onBackClick () {
    this.context.router.history.push('/');
  }

  render() {
    return (
      <div className='dashboard'>
        <h3>Dashboard</h3>
        <div className='col-md-9'>
            <p><strong>This grid area is where the existing (last 10) user saved itineraries will go </strong></p>
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
                   velit cursus nunc, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget</p>
        </div>
        <div className='col-md-3'>
          <h2>Select a Country:</h2>
          <form action='/tripbuild'>
            <div className='dashradio'>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio1' />
                <label for='radio1'>England</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio2' />
                <label for='radio2'>France</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio3' />
                <label for='radio3'>Germany</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio4' />
                <label for='radio4'>Italy</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio5' />
                <label for='radio5'>Spain</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio6' />
                <label for='radio6'>Netherlands</label>
              </div>
            </div>
            <button className='btn btn-default' type='submit'>
              Click to Create Custom Itinerary
            </button>
            <div>
              <strong>or</strong>
            </div>
          </form>
          <form action='/places'>
            <button className='btn btn-default' type='submit'>
              Click to Manually Search Places
            </button>
            </form>
          <button onClick={this.onBackClick.bind(this)} className='btn btn-default'>Back</button>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({});

export default connect(mapStatetoProps)(Dashboard);