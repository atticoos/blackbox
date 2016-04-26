'use strict';

import cheerio from 'cheerio';

function parseChannelColumn ($column) {
  var $img = $column.find('img');
  var name = $img.attr('alt');
  var logo = $img.attr('src');
  var link = $column.find('a').attr('href');
  return {name, link, logo};
}

function parseProgramColumn ($column) {
  var title = mergeSplits($column.find('h2').text());
  var subtitle = mergeSplits($column.find('.subtitle').text().trim());
  var description = $column.find('.description').text().trim();
  var time = {
    start: $column.find('.time').attr('data-start'),
    end: $column.find('.time').attr('data-end')
  };
  var link = $column.find('a').attr('href');
  return {title, subtitle, description, time, link};
}

function mergeSplits (raw) {
  return raw.split(/\r?\n/)
    .map(item => item.trim())
    .filter(item => !!item)
    .join(' - ');
}

export function parseListingPage (page) {
  const $ = cheerio.load(page);
  var rows = [];

  $('table.browse-live-grid tbody tr').each((i, row) => {
    var $row = $(row);
    var channel = parseChannelColumn($row.find('.channel'));
    var programs = [];
    $row.find('.program').each((i, column) => {
      programs.push(parseProgramColumn($(column)));
    });
    rows.push({channel, programs});
  });

  return rows;
}

export function parseFormFields (page) {
  const $ = cheerio.load(page);
  var $form = $('form[name="signin"]');
  var fields = {};

  $form.find('input[type="hidden"]').each((i, field) => {
    var $field = $(field);
    fields[$field.attr('name').trim()] = $field.attr('value').trim();
  });
  return fields;
}
