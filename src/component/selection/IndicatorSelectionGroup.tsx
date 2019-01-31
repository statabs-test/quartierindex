import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Rootstate } from '../../state/index'
import { Indicator } from '../../state/indicator/types'
import {
  deselectIndicator,
  selectIndicator,
  toggleGroupIndicators,
} from '../../state/indicator/actions'

interface PublicProps {
  groupName: string
  value: Indicator[]
}

type Props = {
  select(id: string): void
  deselect(id: string): void
  toggleGroup(subject: string, selected: boolean): void
} & PublicProps

function getToggleLabel(label: String) {
  switch (label) {
    case 'Gesellschaft und Soziales':
      return 'Alle gesellschaftlichen Indikatoren'
    case 'Raum und Umwelt':
      return 'Alle räumlichen Indiktatoren'
    case 'Wirtschaft und Arbeit':
      return 'Alle wirtschaftlichen Indikatoren'
    default:
      return 'Alle Indikatoren'
  }
}

const IndicatorSelectionGroup: React.SFC<Props> = props => {
  const { value, groupName, select, deselect, toggleGroup } = props
  const groupSelectedCount = _.filter(value, indicator => indicator.selected).length
  return (
    <div className="selectionGroup">
      <div className="selectionGroupTitle">
        {groupName} ({groupSelectedCount})
      </div>
      <div className="selectionCheckboxes">
        {value.map(indicator => (
          <div key={indicator.id} className="selectionCheckbox">
            <label>
              <input
                type="checkbox"
                id={indicator.id}
                name={indicator.name}
                value={indicator.id}
                checked={indicator.selected || false}
                onChange={e => {
                  return e.target.checked ? select(indicator.id) : deselect(indicator.id)
                }}
              />
              {indicator.name}
            </label>
          </div>
        ))}
      </div>
      <div className="toggleGroup">
        <label>
          <input
            type="checkbox"
            id={groupName}
            value={groupName}
            checked={groupSelectedCount === value.length}
            onChange={e => {
              return toggleGroup(groupName, e.target.checked)
            }}
          />
          {getToggleLabel(groupName)}
        </label>
      </div>
    </div>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  // empty
})

const mapDispatchToProps = {
  select: selectIndicator,
  deselect: deselectIndicator,
  toggleGroup: toggleGroupIndicators,
}

export default compose<Props, PublicProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IndicatorSelectionGroup)
