import React from 'react';
import { Table } from 'semantic-ui-react';
import LoaderSegment from '../misc/loader-segment.js';

const SongTable = (props) => {
  if(!props.songs || props.songs.length === 0) {
    return <LoaderSegment size='medium' />;
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Track</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Time</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          props.songs.map(song => {
            return (
              <Table.Row key={song.songid} positive={song.playcount > 0}>
                <Table.Cell>{song.track}</Table.Cell>
                <Table.Cell>{song.title}</Table.Cell>
                <Table.Cell>{song.durationReadable}</Table.Cell>
              </Table.Row>
            );
          })
        }
      </Table.Body>
    </Table>
  );
};

export default SongTable;
