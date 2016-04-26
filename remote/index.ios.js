/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Channel from './row';

console.ignoredYellowBox = [
  "Warning: In next release empty section headers will be rendered. In this release you can use 'enableEmptySections' flag to render empty section headers."
];

class Remote extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }
  componentDidMount () {
    fetch('http://localhost:8080/channels').then(response => response.json()).then(channels => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(channels)
      });
    });
  }
  watch (channel, programs) {
    fetch('http://localhost:8080/watch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        programs
      })
    });
  }
  renderRow ({channel, programs}) {
    return (
      <Channel 
        channel={channel}
        programs={programs}
        onPressed={() => this.watch(channel, programs)} />
    )
    return (
      <View style={styles.row}>
        <Image
          source={{uri: channel.logo}}
          style={styles.channelLogo}
        />
        <View style={styles.rowInfo}>
          <Text>{channel.name}</Text>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={data => this.renderRow(data)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 20
  },
  listView: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  channelLogo: {
    height: 80,
    width: 80
  },
  rowInfo: {
    flex: 1
  }
});

AppRegistry.registerComponent('remote', () => Remote);
