import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  browserHistory
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CardsPage from "./pages/CardsPage";
import FaPage from "./pages/Fapage";
import ButtonPage from "./pages/ButtonPage";
import CSSPage from "./pages/CSSPage";
import TablePage from "./pages/TablePage";
import BadgePage from "./pages/BadgePage";
import BreadcrumbPage from "./pages/BreadcrumbPage";
import ComponentsPage from "./pages/ComponentsPage";
import InputPage from "./pages/InputPage";
import JumbotronPage from "./pages/JumbotronPage";
import ListGroupPage from "./pages/ListGroupPage";
import CarouselPage from "./pages/CarouselPage";
import MediaPage from "./pages/MediaPage";
import ModalPage from "./pages/ModalPage";
import TooltipsPage from "./pages/TooltipsPage";
import FooterPage from "./pages/FooterPage";
import DropdownPage from "./pages/DropdownPage";
import FrancePage from "./pages/FrancePage";
import GermanyPage from "./pages/GermanyPage";
import ItalyPage from "./pages/ItalyPage";
import UnitedkingdomPage from "./pages/UnitedkingdomPage";
import SpainPage from "./pages/SpainPage";
class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" component={CarouselPage} />
          <Route exact path="/css" component={CSSPage} />
          <Route exact path="/france" component={FrancePage} />
          <Route exact path="/germany" component={GermanyPage} />
          <Route exact path="/italy" component={ItalyPage} />
          <Route exact path="/unitedkingdom" component={UnitedkingdomPage} />
          <Route exact path="/spain" component={SpainPage} />
          <Route exact path="/css/table" component={TablePage} />
          <Route exact path="/components" component={ComponentsPage} />
          <Route path="/components/badge" component={BadgePage} />
          <Route path="/components/breadcrumb" component={BreadcrumbPage} />
          <Route path="/components/input" component={InputPage} />
          <Route path="/css/jumbotron" component={JumbotronPage} />
          <Route path="/components/cards" component={CardsPage} />
          <Route path="/components/media" component={MediaPage} />
          <Route exact path="/button" component={ButtonPage} />
          <Route exact path="/listgroup" component={ListGroupPage} />
          <Route path="/components/tooltips" component={TooltipsPage} />
          <Route path="/components/footer" component={FooterPage} />
          <Route path="/components/dropdown" component={DropdownPage} />
          <Route path="/javascript/carousel" component={CarouselPage} />
          <Route path="/javascript/modal" component={ModalPage} />
          <Route
            render={function() {
              return <h1>Not Found</h1>;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
