import React from "react";

export default function RestoReservations({ date, pax, time, username }) {
  let fixedDate = date.split("T")[0].split("-");
  let endDate = fixedDate[2] + "-" + fixedDate[1] + "-" + fixedDate[0];

  return (
    <div>
      <div>
        <p>Usuario: {username} </p>
        <p>Cantidad de personas: {pax}</p>
        <p>Fecha: {endDate}</p>
        <p>Horario: {time}</p>
      </div>
    </div>
  );
}
