import { GriddleDataGrid } from "./griddle-grid"
import { GriddleColumn } from "./griddle-column"
import { GriddleRow } from "./griddle-row"
import { GriddleCell } from "./griddle-cell"
declare global {
    interface HTMLElementTagNameMap {
      'gdl-data-grid': GriddleDataGrid;
      'gdl-grid-column': GriddleColumn;
      'gdl-grid-row': GriddleRow;
      'gdl-grid-cell': GriddleCell;
    }
  }