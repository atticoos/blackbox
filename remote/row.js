'use strict';

import React, {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import moment from 'moment';

export default function Row ({channel, programs, onPressed}) {
  return (
    <TouchableOpacity onPress={() => onPressed()}>
    <View style={styles.row}>
      <ImageRedirect
        uri={channel.logo}
        style={styles.image}
        resizeMode="contain" />
      <View style={styles.rowInfo}>
        <Text style={styles.channel}>{channel.name}</Text>
        <View style={styles.programs}>
          <Text style={styles.program}>{programs[0].title}</Text>
          <Text style={styles.time}>
            {moment.unix(programs[0].time.start / 1000).format('hh:mma')}
            -
            {moment.unix(programs[0].time.end / 1000).format('hh:mma')}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
  )
}

class ImageRedirect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {uri: null};
  }
  componentDidMount () {
    fetch(this.props.uri).then(response => {
      this.setState({uri: response.url});
    }).catch(error => console.log(this.props.uri, error));
  }
  render () {
    var {
      uri,
      ...props
    } = this.props;
    return (
      <Image
        source={{uri: this.state.uri}}
        {...props} />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  image: {
    height: 80,
    width: 80
  },
  rowInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15
  },
  channel: {
    fontSize: 18,
    marginBottom: 4
  },
  programs: {

  },
  program: {
    fontSize: 16
  },
  time: {
    fontSize: 12
  }
})
