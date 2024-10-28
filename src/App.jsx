import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY_CHAR = 'SORT_BY_CHAR';
const SORT_BY_LENGTH = 'SORT_BY_LENGTH';

const Goods = ({ goods }) => (
  <ul>
    {goods.map(el => (
      <li data-cy="Good" key={el}>
        {el}
      </li>
    ))}
  </ul>
);

const sortGoods = (goods, sortType = '', isReverse = false) => {
  if (!sortType && isReverse) return [...goods].reverse();

  const sortedGoods = [...goods].sort((a, b) => {
    switch (sortType) {
      case SORT_BY_CHAR:
        return isReverse ? b.localeCompare(a) : a.localeCompare(b);

      case SORT_BY_LENGTH:
        // return isReverse ? b.length - a.length : a.length - b.length;

        return a.length - b.length;

      default:
        return 0;
    }
  });

  return isReverse && sortType === SORT_BY_LENGTH
    ? sortedGoods.reverse()
    : sortedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReverse, setReverse] = useState(false);

  const goods = sortGoods(goodsFromServer, sortType, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SORT_BY_CHAR,
          })}
          onClick={() => setSortType(SORT_BY_CHAR)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => {
            setReverse(!isReverse);
          }}
        >
          Reverse
        </button>

        {(sortType !== '' || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <Goods goods={goods} />
    </div>
  );
};
