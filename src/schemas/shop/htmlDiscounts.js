export function structureDiscountsData (discounts) {
  let htmlDiscounts = '';
  if (discounts.length > 0) {
    discounts.sort((a, b) => a.discount_kind.localeCompare(b.discount_kind));
    htmlDiscounts += `
    ${discounts.map((discount) => {
      return `
        <div class="discount-card storageDiscountCard">
          <div class="optionsViewToggle">
          </div>

          <div class="discountOptions-ask">
            <div class="discBtns deleteDiscountBtn deleteBtn">
              Eliminar descuento
              <img class="btn-icon" src="/svg/trash-icon.svg"/>

            </div>
          </div>

          <div class="discount-cardColumn cardDiscountAmount">
            <div class="amount-box">${discount.discount_amount}</div>
          </div>
          <div class="discount-cardColumn cardDiscountKind" id-info="${discount.discount_id}">${discount.discount_kind === 'porcentaje' ? '%' : 'MXN'}</div>

        </div >

      `;
    }).join('')
      }
  `;
  } else {
    htmlDiscounts += '<div class="no-content">Sin descuentos disponibles</div>';
  }

  return htmlDiscounts;
}
