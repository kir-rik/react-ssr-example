import { connect } from 'react-redux';

import GreetingsPure from './GreetingsPure';

const mapStateToProps = ({ userInfoSubstore }) => ({
  name: userInfoSubstore.userName,
});

export default connect(mapStateToProps)(GreetingsPure);
