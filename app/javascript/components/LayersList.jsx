import React from 'react'
import { Link } from 'react-router-dom'

const layers = [
  '107b72a6-6a52-4c8e-a261-d01706627322',
  '16a5729f-0f2e-4cd6-84bc-0f72c9132dda',
  'a5be2a9d-9dde-4b84-8ff3-b04049448107',
  '0e0d91f1-6faf-4631-a77c-140a6a70c139',
  '29efde50-b201-4818-be2e-8d4253588966',
  '69242f3e-86f5-4d4c-8b14-5058c5023547',
  '969fe99d-b861-46a1-8c8e-7c44cbafd1d6',
  '2a694289-fec9-4bfe-a6d2-56c3864ec349',
  '2e16ff2f-9ca1-48c1-bb23-ac6502f11ae5',
  '3a52f7ed-0c20-4691-981b-3a3521b069aa',
  '1ee0784f-654f-4caf-a059-f03dc46724b6',
  '253437ed-1e21-4544-8bb3-1ec2d2656522',
  '2c7ddb1a-6a21-4f6c-a5a3-696e92bcf053',
  '43804fe4-8c9a-42fc-8c85-2a494727cf3d',
  '3ba9bed2-66ee-4bfa-80c3-a2d959f9a611',
  '4711941a-7aff-48e3-b105-e46dbf43ba5a',
  'b0200f12-92a4-40a3-82f4-d485a21a2195',
]

const LayersList = () => {
  return <div style={{
    borderBottom: '1px solid #B8C5D0',
  }}>
    <h1>Layers</h1>

    <ul>
      {layers.map((layer) => {
        return <li key={layer}>
          <Link to={"/layers/" + layer}>{layer}</Link>
        </li>
      })}
    </ul>
  </div>
}

export default LayersList
