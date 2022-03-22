const appRoot = document.getElementById('app-root');

const create_element = (tag, class_name) => {
  const $tag = document.createElement(tag);

  if (class_name) {
    $tag.classList.add(class_name);
  }

  return $tag;
};

const two = 2;
const $header = create_element('header', 'header');
const $title = create_element('h1');
const $form = create_element('form');
const $divRadio = create_element('div', 'divRadio');
const $divLanguage = create_element('div', 'divLanguage');
const $pRegion = create_element('p', 'pRegion');
const $pLanguage = create_element('p', 'pLanguage');
const $select = create_element('select');
const $option = create_element('option');
const $main = create_element('main', 'main');
const $pNoTable = create_element('p');

$title.innerText = 'Countries Search';
$pRegion.innerText = 'Please choose type of search:';
$pLanguage.innerText = 'Please choose search quary:';
$option.innerText = 'Select value';

$select.disabled = true;

appRoot.appendChild($header);
$header.appendChild($title);
$header.appendChild($form);
$form.appendChild($divRadio);
$divRadio.appendChild($pRegion);

for (let i = 0; i < two; i++) {
  const $radio = create_element('input', 'radioInput');
  const $label = create_element('label', 'labelForRadio');

  $radio.setAttribute('type', 'radio');
  $radio.setAttribute('name', 'radio');

  $label.setAttribute('for', $radio.name);

  if (i === 0) {
    $radio.setAttribute('id', 'radioRegion');
    $label.innerText = 'By Region';
  } else {
    $radio.setAttribute('id', 'radioLanguage');
    $label.innerText = 'By Language';
  }

  $divRadio.appendChild($radio);
  $divRadio.appendChild($label);
}

$form.appendChild($divLanguage);
$divLanguage.appendChild($pLanguage);
$divLanguage.appendChild($select);
$select.appendChild($option);

document.getElementById('radioRegion').addEventListener('change', () => {
  $select.disabled = false;
  $select.innerHTML = '';
  $pNoTable.innerText = 'No items, please choose search query';

  for (let i = 0; i < externalService.getRegionsList().length; i++) {
    let option = create_element('option');

    option.innerText = externalService.getRegionsList()[i];
    option.setAttribute('name', 'region');
    option.setAttribute('value', externalService.getRegionsList()[i]);
    option.setAttribute('id', externalService.getRegionsList()[i]);

    $select.add(option);
  }

  $select.addEventListener('change', () => {
    let data = $select.value;
    $pNoTable.innerHTML = '';

    if ($select.value === data) {
      buildTable(externalService.getCountryListByRegion(data));
    }
  });
});

document.getElementById('radioLanguage').addEventListener('change', () => {
  $select.disabled = false;
  $select.innerHTML = '';

  $pNoTable.innerText = 'No items, please choose search query';

  for (let i = 0; i < externalService.getLanguagesList().length; i++) {
    let option = create_element('option');

    option.innerText = externalService.getLanguagesList()[i];
    option.setAttribute('name', 'language');
    option.setAttribute('value', externalService.getLanguagesList()[i]);

    $select.appendChild(option);
  }

  $select.addEventListener('change', () => {
    let data = $select.value;
    $pNoTable.innerHTML = '';

    if ($select.value === data) {
      buildTable(externalService.getCountryListByLanguage(data));
    }
  });
});

appRoot.appendChild($main);
$main.appendChild($pNoTable);

function buildTable(data) {
  let header = create_element('th');
  let row = create_element('tr');
  let column = create_element('td');

  for (let elem of data) {
    row = appRoot.appendChild(row.cloneNode());

    if (header) {
      for (let str in elem) {
        header = row.appendChild(header.cloneNode());
        header.appendChild(document.createTextNode(str));
      }
      row = appRoot.appendChild(row.cloneNode());
      header = null;
    }

    for (let str in elem) {
      column = row.appendChild(column.cloneNode());
      column.appendChild(document.createTextNode(elem[str]));
    }
  }
}
