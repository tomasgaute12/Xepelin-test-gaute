import React from 'react';
import Typography from '@material-ui/core/Typography';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './DataList.css'; // Archivo CSS para estilos personalizados

export function DataList({ dataList }) {
  return (
    <div className="data-list-container">
      <h2 className="data-list-title">Historial de transacciones</h2>
      {dataList && dataList.length > 0 ? (
        <DataTable
          value={dataList}
          className="p-datatable-custom"
          headerClassName="p-datatable-header"
          rowClassName="p-datatable-row"
        >
          <Column field="type" header="Tipo" className="p-column-centered p-column-aligned-right" />
          <Column
                field="amount"
                header="Monto"
                className="p-column-align-right"
                body={(rowData) => (
                <span>
                    {rowData.amount.toLocaleString('es-US', {
                    style: 'currency',
                    currency: 'USD',
                    })}
                </span>
                )}/>
          <Column field="date" header="Fecha" className="p-column-centered p-column-aligned-right" />
        </DataTable>
      ) : (
        <p className="no-data-message">No hay datos disponibles.</p>
      )}
    </div>
  );
} 
