import React from 'react';
import { Table } from 'stardust';
import LoaderSegment from '../misc/loader-segment.js';
import PlayEpisodeButton from './play-episode-button.js';

const EpisodeTable = (props) => {
  if(!props.episodes) {
    return <LoaderSegment size='medium' />;
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Episode</Table.HeaderCell>
          <Table.HeaderCell>Plot</Table.HeaderCell>
          <Table.HeaderCell>#</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          props.episodes.map(episode => {
            return (
              <Table.Row key={episode.episodeid} positive={episode.playcount > 0}>
                <Table.Cell>{episode.label}</Table.Cell>
                <Table.Cell>{episode.plot}</Table.Cell>
                <Table.Cell><PlayEpisodeButton episode={episode} /></Table.Cell>
              </Table.Row>
            );
          })
        }
      </Table.Body>
    </Table>
  );
};

export default EpisodeTable;
