import React from 'react';

const About = () => {
  return (
    <>
      <div className='about my-2'>
        <h1 className='heading-primary'>Sobre nós</h1>
        <h2 className='heading-secondary'>Conheça a gente</h2>
        <div className='about-inner'>
          <img
            src='/images/sobre-nos.png'
            alt=''
            width='300'
            className='about-image'
          />
          <div className='about-text'>
            <p>
              Duas amigas que decidiram inovar suas vidas na pandemia! Eis o
              resultado: doces finos e lindos para vocês. Queremos dividir com
              os nossos clientes o que há de melhor na confeitaria e mostrar que
              o simples pode se tornar sofisticado quando bem feito. Esperamos
              que amem... afinal tudo aqui é feito com muito amor!
            </p>
            <p className='heading-secondary my-5'>Roberta e Maísa</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
