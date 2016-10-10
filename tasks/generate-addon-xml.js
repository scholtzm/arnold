const fs = require('fs');
const jstoxml = require('jstoxml');
const _ = require('lodash');
const gutil = require('gulp-util');
const packageJson = require('../package.json');

const addonXmlObject = {
  _name: 'addon',
  _attrs: {
    id: `webinterface.${packageJson.name.toUpperCase()}`,
    version: packageJson.version,
    name: _.capitalize(packageJson.name),
    'provider-name': packageJson.author.name
  },
  _content: [
    {
      requires: {
        _name: 'import',
        _attrs: {
          addon: 'xbmc.json',
          version: '6.14.3'
        }
      }
    },
    {
      _name: 'extension',
      _attrs: {
        point: 'xbmc.webinterface'
      }
    },
    {
      _name: 'extension',
      _attrs: {
        point: 'xbmc.addon.metadata'
      },
      _content: [
        {
          _name: 'summary',
          _attrs: {
            lang: 'en'
          },
          _content: packageJson.description
        },
        {
          _name: 'description',
          _attrs: {
            lang: 'en'
          },
          _content: 'Arnold is a modern generic web interface for Kodi which aims to provide relevant information and functionality in a sleek and intuitive design.'
        },
        {
          _name: 'disclaimer',
          _attrs: {
            lang: 'en'
          },
          _content: 'If you run into any issues, please report them in the forum.'
        },
        {platform: 'all'},
        {license: packageJson.license},
        {forum: 'To be added.'},
        {source: packageJson.repository.url}
      ]
    }
  ]
};

const targetFileName = `./package/${addonXmlObject._attrs.id}/addon.xml`;

function generateAddonXml(callback) {
  const addonXml = jstoxml.toXML(addonXmlObject, {header: true, indent: '\t'});

  fs.writeFile(targetFileName, addonXml, err => {
    if(err) {
      throw new gutil.PluginError('[generate-addon-xml] Failed to write addon.xml file.', err);
    }

    callback();
  });
}

module.exports = generateAddonXml;
